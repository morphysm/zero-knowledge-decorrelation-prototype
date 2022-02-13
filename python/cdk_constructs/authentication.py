"""Maintain a Cognito user pool for authentication.

TODO: Documentation on how this integrates with the front end.
"""

from aws_cdk import aws_cognito, core

# TODO: Josh: help me have this connect to your application.
WEB_APP_HOMEPAGE = "https://www.google.com"
CALLBACK_URL = "https://www.google.com"
LOGOUT_URL = "https://www.google.com"


class Authentication(core.Construct):
    def __init__(self, scope: core.Construct, id: str) -> None:
        """Create a Cognito UserPool for authenticating into API.

        Instantiate a client that the front end website can use
        to authenticate with OAuth. Integration the client with the
        user pool by creating our own domain through Cognito and creating
        a sign-in URL within that domain the fron-end can use to kick off
        the authentication.

        See:
            https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-app-integration.html
            https://docs.aws.amazon.com/cdk/api/v1/python/aws_cdk.aws_cognito/UserPool.html
            https://docs.aws.amazon.com/cdk/api/v1/python/aws_cdk.aws_cognito/UserPoolDomain.html#aws_cdk.aws_cognito.UserPoolDomain
            https://docs.aws.amazon.com/cdk/api/v1/python/aws_cdk.aws_cognito/OAuthSettings.html#aws_cdk.aws_cognito.OAuthSettings
        """

        super().__init__(scope=scope, id=id)

        # Create user pool and domain.
        self.user_pool = aws_cognito.UserPool(
            scope=self,
            id=f"{id}UserPool",
            user_pool_name=f"{id}UserPool",
            self_sign_up_enabled=False,
            standard_attributes=aws_cognito.StandardAttributes(
                email=aws_cognito.StandardAttribute(required=True, mutable=True),
                phone_number=aws_cognito.StandardAttribute(
                    required=False, mutable=True
                ),
            ),
            auto_verify=aws_cognito.AutoVerifiedAttrs(email=True, phone=True),
            user_invitation=aws_cognito.UserInvitationConfig(
                email_subject="Welcome to Zico Badges!",
            ),
            account_recovery=aws_cognito.AccountRecovery.EMAIL_ONLY,
        )
        # user pool client
        self.client = self.user_pool.add_client(
            id=f"{id}WebAppClient",
            o_auth=aws_cognito.OAuthSettings(
                flows=aws_cognito.OAuthFlows(authorization_code_grant=True),
                scopes=[aws_cognito.OAuthScope.OPENID],
                callback_urls=[CALLBACK_URL],
                logout_urls=[LOGOUT_URL],
            ),
            supported_identity_providers=[
                aws_cognito.UserPoolClientIdentityProvider.COGNITO,
            ],
        )

        # Create auth domain and sign-in URL
        sign_in_url = self.user_pool.add_domain(
            id=f"{id}AuthDomain".lower(),
            cognito_domain=aws_cognito.CognitoDomainOptions(domain_prefix=id.lower()),
        ).sign_in_url(self.client, redirect_uri=WEB_APP_HOMEPAGE)

        # Output to cdk_deployment_outputs.json.
        core.CfnOutput(scope=self, id="UserPoolId", value=self.user_pool.user_pool_id)
        core.CfnOutput(
            scope=self, id="UserPoolClientId", value=self.client.user_pool_client_id
        )
        core.CfnOutput(scope=self, id="UserPoolSignInUrl", value=sign_in_url)
