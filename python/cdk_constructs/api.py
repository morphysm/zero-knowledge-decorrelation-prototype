"""REST API through API Gateway as well as lambda handlers for each method."""
import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, List, Literal, Optional

from aws_cdk import (
    aws_apigateway,
    aws_dynamodb,
    aws_lambda,
    aws_lambda_nodejs,
    aws_lambda_python,
    core,
)

import python.cdk_constructs.api_schemas as schemas

# Constants
BASE_PATH = Path(__file__).parent.parent.parent.absolute()
NODEJS_BASE_PATH: Path = Path(BASE_PATH, "nodejs")
PYTHON_BASE_PATH: Path = Path(BASE_PATH, "python")

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
        accounts_table: aws_dynamodb.Table,
        badges_table: aws_dynamodb.Table,
        daos_table: aws_dynamodb.Table,
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
            id="RestApi",
        )

        # Api Resources
        badges_resource = rest_api.root.add_resource("badges")
        badge_resource = badges_resource.add_resource("{badge}")

        auth_resource = rest_api.root.add_resource("auth")

        accounts_resource = rest_api.root.add_resource("accounts")
        account_resource = accounts_resource.add_resource("{account}")

        daos_resource = rest_api.root.add_resource("daos")
        dao_resource = daos_resource.add_resource("{dao}")

        # Handler definitions
        # Auth
        self.authenticate_platform_handler = self.create_python_handler(
            method_name="authenticate_platform"
        )

        # Accounts
        self.list_accounts_handler = self.create_python_handler(
            method_name="list_accounts"
        )
        self.create_account_handler = self.create_python_handler(
            method_name="create_account"
        )
        self.delete_account_handler = self.create_python_handler(
            method_name="delete_account"
        )
        # Badges
        self.mint_badges_handler = self.create_nodejs_handler(
            method_name="mint_badge",
        )
        self.list_badges_handler = self.create_nodejs_handler(
            method_name="list_badges",
        )

        self.get_badge_handler = self.create_python_handler(method_name="get_badge")

        # Daos
        self.list_daos_handler = self.create_python_handler(method_name="list_daos")
        self.create_dao_handler = self.create_python_handler(method_name="create_dao")
        self.delete_dao_handler = self.create_python_handler(method_name="delete_dao")

        # Allow API handlers to read from DB
        # Pynamo ORN requires full access
        accounts_table.grant_full_access(self.list_accounts_handler)
        accounts_table.grant_full_access(self.create_account_handler)
        accounts_table.grant_full_access(self.delete_account_handler)

        badges_table.grant_full_access(self.mint_badges_handler)
        badges_table.grant_full_access(self.list_badges_handler)

        daos_table.grant_full_access(self.list_daos_handler)
        daos_table.grant_full_access(self.create_dao_handler)
        daos_table.grant_full_access(self.delete_dao_handler)

        # Validators
        # see here: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-validation-set-up.html
        body_validator = aws_apigateway.RequestValidator(
            scope=self,
            id="BodyValidator",
            rest_api=self.rest_api,
            validate_request_body=True,
            validate_request_parameters=False,
        )

        params_validator = aws_apigateway.RequestValidator(
            scope=self,
            id="RequestBodyAndParametersValidator",
            rest_api=self.rest_api,
            validate_request_body=False,
            validate_request_parameters=True,
        )

        # Integrate handlers with API resources
        # Auth
        self.integrate_lambda_and_resource(
            lambda_handler=self.authenticate_platform_handler,
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

        # Accounts
        self.integrate_lambda_and_resource(
            lambda_handler=self.create_account_handler,
            http_method="POST",
            api_resource=accounts_resource,
            request_model=ApiModel(
                "CreateAccountRequestModel",
                schemas.create_account_request_schema,
            ),
            method_responses=[
                MethodResponse(
                    200,
                    ApiModel(
                        "CreateAccountResponseModel",
                        schemas.create_account_response_schema,
                    ).to_model(rest_api),
                ),
                MethodResponse(400, aws_apigateway.Model.ERROR_MODEL),
                MethodResponse(403, aws_apigateway.Model.ERROR_MODEL),
                MethodResponse(404, aws_apigateway.Model.ERROR_MODEL),
            ],
            validator=body_validator,
        )

        self.integrate_lambda_and_resource(
            lambda_handler=self.list_accounts_handler,
            http_method="GET",
            api_resource=accounts_resource,
            request_parameters={
                "method.request.querystring.status": False,
                "method.request.querystring.since": False,
                "method.request.querystring.limit": False,
            },
            method_responses=[
                MethodResponse(
                    200,
                    ApiModel(
                        "ListAccountsResponseModel",
                        schemas.list_accounts_response_schema,
                    ).to_model(rest_api),
                ),
            ],
            validator=params_validator,
        )

        self.integrate_lambda_and_resource(
            lambda_handler=self.delete_account_handler,
            http_method="DELETE",
            api_resource=account_resource,
            request_parameters={
                "method.request.path.account": True,
            },
            method_responses=[
                MethodResponse(200, aws_apigateway.Model.EMPTY_MODEL),
                MethodResponse(400, aws_apigateway.Model.ERROR_MODEL),
                MethodResponse(403, aws_apigateway.Model.ERROR_MODEL),
                MethodResponse(404, aws_apigateway.Model.ERROR_MODEL),
            ],
            validator=params_validator,
        )

        # Badges
        self.integrate_lambda_and_resource(
            lambda_handler=self.mint_badges_handler,
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
            lambda_handler=self.list_badges_handler,
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
            lambda_handler=self.list_badges_handler,
            http_method="GET",
            api_resource=badge_resource,
            request_parameters={"method.request.path.badge": True},
            method_responses=[
                MethodResponse(
                    200,
                    ApiModel(
                        "GetBadgeResponseModel", schemas.get_badge_response_schema
                    ).to_model(rest_api),
                ),
                MethodResponse(400, aws_apigateway.Model.ERROR_MODEL),
                MethodResponse(404, aws_apigateway.Model.ERROR_MODEL),
            ],
            validator=params_validator,
        )

        # Daos
        self.integrate_lambda_and_resource(
            lambda_handler=self.create_dao_handler,
            http_method="POST",
            api_resource=daos_resource,
            request_model=ApiModel(
                "CreateDaoRequestModel",
                schemas.create_account_request_schema,
            ),
            method_responses=[
                MethodResponse(
                    200,
                    ApiModel(
                        "CreateDaoResponseModel",
                        schemas.create_dao_response_schema,
                    ).to_model(rest_api),
                ),
                MethodResponse(400, aws_apigateway.Model.ERROR_MODEL),
                MethodResponse(403, aws_apigateway.Model.ERROR_MODEL),
                MethodResponse(404, aws_apigateway.Model.ERROR_MODEL),
            ],
            validator=body_validator,
        )

        self.integrate_lambda_and_resource(
            lambda_handler=self.list_daos_handler,
            http_method="GET",
            api_resource=daos_resource,
            request_parameters={
                "method.request.querystring.status": False,
                "method.request.querystring.since": False,
                "method.request.querystring.limit": False,
            },
            method_responses=[
                MethodResponse(
                    200,
                    ApiModel(
                        "ListDaosResponseModel",
                        schemas.list_daos_response_schema,
                    ).to_model(rest_api),
                ),
            ],
            validator=params_validator,
        )

        self.integrate_lambda_and_resource(
            lambda_handler=self.delete_dao_handler,
            http_method="DELETE",
            api_resource=dao_resource,
            request_parameters={
                "method.request.path.dao": True,
            },
            method_responses=[
                MethodResponse(200, aws_apigateway.Model.EMPTY_MODEL),
                MethodResponse(400, aws_apigateway.Model.ERROR_MODEL),
                MethodResponse(403, aws_apigateway.Model.ERROR_MODEL),
                MethodResponse(404, aws_apigateway.Model.ERROR_MODEL),
            ],
            validator=params_validator,
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
            index=f"src/handlers/{method_name}.py",
            handler=f"{method_name}_handler",
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
            entry=f"{entry_path}/src/handlers/{method_name}.ts",
            handler=f"{method_name}_handler",
            bundling=aws_lambda_nodejs.BundlingOptions(
                environment=environment,
            ),
            retry_attempts=0,
            **kwargs,
        )
        return handler
