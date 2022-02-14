"""REST API through API Gateway as well as lambda handlers for each method."""
import os
from pathlib import Path
from typing import Any, Dict, Literal, Optional

from aws_cdk import (
    aws_apigateway,
    aws_lambda,
    aws_lambda_nodejs,
    aws_lambda_python,
    core,
)

# Constnats
NODEJS_BASE_PATH: Path = Path("nodejs", "src", "handlers")
PYTHON_BASE_PATH: Path = Path("python", "src", "handlers")
# Environment variables
POLKADOT_ENVIRONMENT: Dict[str, str] = {
    "ALCHEMY_MUMBAI_URL": os.environ["ALCHEMY_MUMBAI_URL"],
    "MUMBAI_PRIVATE_KEY": os.environ["MUMBAI_PRIVATE_KEY"],
}


class Api(core.Construct):
    def __init__(
        self,
        scope: core.Construct,
        id: str,
        **kwargs: Any,
    ) -> None:
        """Create the API Gateway defining an API.

        Two parts:
            1. API Gateway RestAPI instance.
            2. Set of lambda functions implementing endpoint handlers.

        Allow lambdas to run either Python or Javascript processes.
        """

        super().__init__(scope=scope, id=id)

        rest_api = aws_apigateway.RestApi(
            scope=self,
            id=f"{id}RestApi",
        )

        # Api Resources
        badges_resource = rest_api.root.add_resource("badges")
        available_badges_resource = rest_api.root.add_resource("available_badges")
        auth_resource = rest_api.root.add_resource("auth")

        # Handler definitions
        mint_badges_handler = self.create_nodejs_handler(
            method_name="mint_badges",
        )
        list_badges_handler = self.create_nodejs_handler(
            method_name="list_badges",
        )
        list_available_badges = self.create_nodejs_handler(
            method_name="list_available_badges",
        )

        authenticate_platform = self.create_python_handler(
            method_name="authenticate_platform",
            environment=None,
        )

        # Integration handlers with API resources
        self.integrate_lambda_and_resource(
            lambda_handler=mint_badges_handler,
            http_method="POST",
            api_resource=badges_resource,
        )

        self.integrate_lambda_and_resource(
            lambda_handler=list_badges_handler,
            http_method="GET",
            api_resource=badges_resource,
        )

        self.integrate_lambda_and_resource(
            lambda_handler=list_available_badges,
            http_method="GET",
            api_resource=available_badges_resource,
        )

        self.integrate_lambda_and_resource(
            lambda_handler=authenticate_platform,
            http_method="POST",
            api_resource=auth_resource,
        )

    @staticmethod
    def integrate_lambda_and_resource(
        lambda_handler: aws_lambda.IFunction,
        http_method: Literal["POST", "GET", "PATCH", "PUT", "DELETE"],
        api_resource: aws_apigateway.Resource,
    ) -> None:
        lambda_integration = aws_apigateway.LambdaIntegration(handler=lambda_handler)

        api_resource.add_method(
            http_method=http_method,
            integration=lambda_integration,
            api_key_required=False,
        )

    def create_python_handler(
        self,
        method_name: str,
        entry_path: Path = PYTHON_BASE_PATH,
        environment: Optional[Dict[str, str]] = None,
        **kwargs: Any,
    ) -> aws_lambda.IFunction:
        """Create a new handler for executing Python code.

        TODO: Docstring
        """
        method_id = "".join([x.capitalize() for x in method_name.split("_")])

        handler = aws_lambda_python.PythonFunction(
            scope=self,
            id=method_id,
            entry=f"{str(entry_path)}/{method_name}.ts",
            handler=method_name,
            environment=environment,
            retry_attempts=0,
            **kwargs,
        )

        return handler

    def create_nodejs_handler(
        self,
        method_name: str,
        entry_path: Path = NODEJS_BASE_PATH,
        environment: Optional[Dict[str, str]] = POLKADOT_ENVIRONMENT,
        **kwargs: Any,
    ) -> aws_lambda.IFunction:
        """Create a new handler for executing Node.JS code.

        https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda_nodejs-readme.html
        """
        method_id = "".join([x.capitalize() for x in method_name.split("_")])

        handler = aws_lambda_nodejs.NodejsFunction(
            scope=self,
            id=method_id,
            entry=f"{str(entry_path)}/{method_name}.ts",
            handler=f"{method_name}_handler",
            bundling=aws_lambda_nodejs.BundlingOptions(
                environment=environment,
            ),
            retry_attempts=0,
            **kwargs,
        )
        return handler
