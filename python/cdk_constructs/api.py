"""REST API through API Gateway as well as lambda handlers for each method."""
import os
from pathlib import Path
from typing import Any, Dict, List, Literal, Optional

from aws_cdk import (
    aws_apigateway,
    aws_lambda,
    aws_lambda_nodejs,
    aws_lambda_python,
    core,
)

import python.cdk_constructs.api_schemas as schemas

# Constants
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

        rest_api = self.rest_api = aws_apigateway.RestApi(
            scope=self,
            id=f"{id}RestApi",
        )

        # Api Resources
        badges_resource = rest_api.root.add_resource("badges")
        auth_resource = rest_api.root.add_resource("auth")

        # Handler definitions
        mint_badges_handler = self.create_nodejs_handler(
            method_name="mint_badge",
        )
        list_badges_handler = self.create_nodejs_handler(
            method_name="list_badges",
        )

        authenticate_platform = self.create_python_handler(
            method_name="authenticate_platform",
            environment=None,
        )

        # Integrate handlers with API resources
        self.integrate_lambda_and_resource(
            lambda_handler=mint_badges_handler,
            http_method="POST",
            api_resource=badges_resource,
            request_model=rest_api.add_model(
                id="MintBadgeRequestModel",
                content_type="application/json",
                model_name="MintBadgeRequestModel",
                schema=schemas.authenticate_platform_request_schema,
            ),
            method_responses=[
                aws_apigateway.MethodResponse(
                    status_code="200",
                    response_models={
                        "application/json": rest_api.add_model(
                            id="MintBadgeResponseModel",
                            content_type="application/json",
                            model_name="MintBadgeResponseModel",
                            schema=schemas.authenticate_platform_request_schema,
                        ),
                    },
                ),
                aws_apigateway.MethodResponse(
                    status_code="400",
                    response_models={
                        "application/json": aws_apigateway.Model.ERROR_MODEL
                    },
                ),
                aws_apigateway.MethodResponse(
                    status_code="403",
                    response_models={
                        "application/json": aws_apigateway.Model.ERROR_MODEL
                    },
                ),
                aws_apigateway.MethodResponse(
                    status_code="404",
                    response_models={
                        "application/json": aws_apigateway.Model.ERROR_MODEL
                    },
                ),
            ],
        )

        self.integrate_lambda_and_resource(
            lambda_handler=list_badges_handler,
            http_method="GET",
            api_resource=badges_resource,
            request_parameters={
                "method.request.path.platform": True,
                "method.request.path.status": False,
                "method.request.path.since": False,
                "method.request.path.limit": False,
            },
            method_responses=[
                aws_apigateway.MethodResponse(
                    status_code="200",
                    response_models={
                        "application/json": rest_api.add_model(
                            id="ListBadgesResponseModel",
                            content_type="application/json",
                            model_name="ListBadgesResponseModel",
                            schema=schemas.list_badges_response_schema,
                        ),
                    },
                ),
                aws_apigateway.MethodResponse(
                    status_code="400",
                    response_models={
                        "application/json": aws_apigateway.Model.ERROR_MODEL
                    },
                ),
            ],
        )

        self.integrate_lambda_and_resource(
            lambda_handler=authenticate_platform,
            http_method="POST",
            api_resource=auth_resource,
            request_model=rest_api.add_model(
                id="AuthenticatePlatformRequestModel",
                content_type="application/json",
                model_name="AuthenticatePlatformRequestModel",
                schema=schemas.mint_badge_request_schema,
            ),
            method_responses=[
                aws_apigateway.MethodResponse(
                    status_code="200",
                    response_models={
                        "application/json": aws_apigateway.Model.EMPTY_MODEL
                    },
                ),
                aws_apigateway.MethodResponse(
                    status_code="400",
                    response_models={
                        "application/json": aws_apigateway.Model.ERROR_MODEL
                    },
                ),
                aws_apigateway.MethodResponse(
                    status_code="403",
                    response_models={
                        "application/json": aws_apigateway.Model.ERROR_MODEL
                    },
                ),
                aws_apigateway.MethodResponse(
                    status_code="404",
                    response_models={
                        "application/json": aws_apigateway.Model.ERROR_MODEL
                    },
                ),
            ],
        )

    def integrate_lambda_and_resource(
        self,
        lambda_handler: aws_lambda.IFunction,
        http_method: Literal["POST", "GET", "PATCH", "PUT", "DELETE"],
        api_resource: aws_apigateway.Resource,
        request_model: Optional[aws_apigateway.Model] = None,
        request_parameters: Optional[Dict[str, bool]] = None,
        method_responses: Optional[List[aws_apigateway.MethodResponse]] = None,
    ) -> None:
        lambda_integration = aws_apigateway.LambdaIntegration(handler=lambda_handler)

        validator = aws_apigateway.RequestValidator(
            scope=self,
            id=f"{lambda_handler}{api_resource}Validator",
            rest_api=self.rest_api,
            validate_request_body=bool(request_model is not None),
            validate_request_parameters=bool(request_parameters is not None),
        )

        request_models = None
        if request_model is not None:
            request_models = {"application/json": request_model}

        api_resource.add_method(
            http_method=http_method,
            integration=lambda_integration,
            api_key_required=False,
            request_models=request_models,
            method_responses=method_responses,
            request_parameters=request_parameters,
            request_validator=validator,
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
            entry=str(entry_path),
            index=f"{method_name}.py",
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
