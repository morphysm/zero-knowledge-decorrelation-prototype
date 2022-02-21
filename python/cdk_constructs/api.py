"""REST API through API Gateway as well as lambda handlers for each method."""
import os
from dataclasses import dataclass, field
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

DEFAULT_CONTENT_TYPE: str = "application/json"


@dataclass
class ApiModel:
    """Compact format for API model.

    Includes instance method to add model to API.
    """

    name: str
    schema: aws_apigateway.JsonSchema

    content_type: str = field(default=DEFAULT_CONTENT_TYPE)

    def to_aws_format(
        self, rest_api: aws_apigateway.RestApi
    ) -> Dict[str, aws_apigateway.Model]:
        """Return in format passed to function constructor."""
        return {self.content_type: self.to_model(rest_api)}

    def to_model(self, rest_api: aws_apigateway.RestApi) -> aws_apigateway.Model:
        """Create an AWS model and add to RestAPI construct."""
        return rest_api.add_model(
            id=self.name,
            model_name=self.name,
            content_type=self.content_type,
            schema=self.schema,
        )


@dataclass
class MethodResponse:
    """Method response in more compact format that used by AWS.

    Provide instance method to return aws_apigateway.MethodResponse object.
    """

    status_code: int
    response_model: aws_apigateway.Model

    content_type: str = field(default=DEFAULT_CONTENT_TYPE)

    def to_aws_format(self) -> aws_apigateway.MethodResponse:
        return aws_apigateway.MethodResponse(
            status_code=str(self.status_code),
            response_models={self.content_type: self.response_model},
        )


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

        # Validators
        # see here: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-validation-set-up.html
        body_validator = aws_apigateway.RequestValidator(
            scope=self,
            id="BodyValidator",
            rest_api=rest_api,
            validate_request_body=True,
            validate_request_parameters=False,
        )

        params_validator = aws_apigateway.RequestValidator(
            scope=self,
            id="RequestBodyAndParametersValidator",
            rest_api=rest_api,
            validate_request_body=False,
            validate_request_parameters=True,
        )

        # Integrate handlers with API resources
        self.integrate_lambda_and_resource(
            lambda_handler=mint_badges_handler,
            http_method="POST",
            api_resource=badges_resource,
            request_model=ApiModel(
                "MintBadgeRequestModel", schemas.mint_badge_request_schema
            ),
            method_responses=[
                MethodResponse(
                    200,
                    ApiModel(
                        "MintBadgeResponseModel", schemas.mint_badge_response_schema
                    ).to_model(rest_api),
                ),
                MethodResponse(400, aws_apigateway.Model.ERROR_MODEL),
                MethodResponse(403, aws_apigateway.Model.ERROR_MODEL),
                MethodResponse(404, aws_apigateway.Model.ERROR_MODEL),
            ],
            validator=body_validator,
        )

        self.integrate_lambda_and_resource(
            lambda_handler=list_badges_handler,
            http_method="GET",
            api_resource=badges_resource,
            request_parameters={
                "method.request.querystring.platform": True,
                "method.request.querystring.status": False,
                "method.request.querystring.since": False,
                "method.request.querystring.limit": False,
            },
            method_responses=[
                MethodResponse(
                    200,
                    ApiModel(
                        "ListBadgesResponseModel", schemas.list_badges_response_schema
                    ).to_model(rest_api),
                ),
                MethodResponse(400, aws_apigateway.Model.ERROR_MODEL),
            ],
            validator=params_validator,
        )

        self.integrate_lambda_and_resource(
            lambda_handler=authenticate_platform,
            http_method="POST",
            api_resource=auth_resource,
            request_model=ApiModel(
                "AuthenticatePlatformRequestModel",
                schemas.authenticate_platform_request_schema,
            ),
            method_responses=[
                MethodResponse(200, aws_apigateway.Model.EMPTY_MODEL),
                MethodResponse(400, aws_apigateway.Model.ERROR_MODEL),
                MethodResponse(403, aws_apigateway.Model.ERROR_MODEL),
                MethodResponse(404, aws_apigateway.Model.ERROR_MODEL),
            ],
            validator=body_validator,
        )

    def integrate_lambda_and_resource(
        self,
        lambda_handler: aws_lambda.IFunction,
        http_method: Literal["POST", "GET", "PATCH", "PUT", "DELETE"],
        api_resource: aws_apigateway.Resource,
        validator: aws_apigateway.RequestValidator,
        request_model: Optional[ApiModel] = None,
        request_parameters: Optional[Dict[str, bool]] = None,
        method_responses: Optional[List[MethodResponse]] = None,
    ) -> None:
        """Link a lambda function to an API gateway resource.

        Also set up validation.

        See:
            https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-apigateway.MethodOptions.html
        """
        lambda_integration = aws_apigateway.LambdaIntegration(handler=lambda_handler)

        formatted_request_models: Optional[Dict[str, aws_apigateway.Model]] = None
        formatted_method_responses: Optional[List[aws_apigateway.MethodResponse]] = None

        if request_model is not None:
            formatted_request_models = request_model.to_aws_format(
                rest_api=self.rest_api
            )
        if method_responses is not None:
            formatted_method_responses = [m.to_aws_format() for m in method_responses]

        api_resource.add_method(
            http_method=http_method,
            integration=lambda_integration,
            api_key_required=False,
            request_models=formatted_request_models,
            method_responses=formatted_method_responses,
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
