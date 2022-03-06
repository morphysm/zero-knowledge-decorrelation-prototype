"""Objects used to define API schema for API Gateway.

We can then use the console to generate documentation in one
of several formats.
"""

from aws_cdk import aws_apigateway

from python.lib.enums import Platform

# PRIMITIVES
address_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    type=aws_apigateway.JsonSchemaType.STRING,
    title="Address",
    description="A cryptocurrency address",
)

badge_name_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    type=aws_apigateway.JsonSchemaType.STRING,
    title="Badge Name",
    description="Name of a badge",
)

badge_names_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    type=aws_apigateway.JsonSchemaType.ARRAY,
    title="Badge Names",
    description="List of Badge Names",
    items=badge_name_schema,
)

platform_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    type=aws_apigateway.JsonSchemaType.STRING,
    title="Platform",
    description="Web2 platform. e.g., Discord, Twitter, Reddit.",
    enum=[p.name for p in Platform],
)

created_datetime_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    type=aws_apigateway.JsonSchemaType.STRING,
    title="Created Datetime",
    description="Datetime resource is created.",
)

image_url_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    type=aws_apigateway.JsonSchemaType.STRING,
    title="Image URL",
    description="URL where resource image can be located.",
)

description_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    type=aws_apigateway.JsonSchemaType.STRING,
    title="Description",
    description="Full description of resource.",
)

auth_code_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    type=aws_apigateway.JsonSchemaType.STRING,
    title="Authorization Code",
    description="Authorization code returned by account for initiating an OAuth2 flow",
)

scopes_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    type=aws_apigateway.JsonSchemaType.ARRAY,
    items=aws_apigateway.JsonSchema(
        title="Scope", type=aws_apigateway.JsonSchemaType.STRING
    ),
    title="Scopes",
    description="Collection of OAuth2 Scopes.",
)

account_id_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    type=aws_apigateway.JsonSchemaType.STRING,
    title="Account ID",
    description="ID of a account on a given platform.",
)

metamask_id_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    type=aws_apigateway.JsonSchemaType.STRING,
    title="Metamask ID",
    description="Metamask ID",
)

discord_server_id_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    type=aws_apigateway.JsonSchemaType.STRING,
    title="Discord Server ID",
    description="ID of the Discord Server",
)

discord_role_id_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    type=aws_apigateway.JsonSchemaType.STRING,
    title="Discord Role ID",
    description="ID of a Discord Role",
)

dao_name_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    type=aws_apigateway.JsonSchemaType.STRING,
    title="Dao Name",
    description="Name of a Decentralized Autonomous Organization (DAO)",
)

# DATA STRUCTURES
account_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    title="Zeko Account",
    type=aws_apigateway.JsonSchemaType.OBJECT,
    properties={
        "account_id": account_id_schema,
        "platform": platform_schema,
        "metamask_id": metamask_id_schema,
        "badges": badge_names_schema,
        "server_id": discord_server_id_schema,
        "role_id": discord_role_id_schema,
    },
)


badge_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    title="Zeko Badge",
    type=aws_apigateway.JsonSchemaType.OBJECT,
    properties={
        "address": address_schema,
        "name": badge_name_schema,
        "platform": platform_schema,
        "created_datetime": created_datetime_schema,
        "image_url": image_url_schema,
        "description": description_schema,
    },
    required=["name", "platform", "address", "created_datetime"],
)

dao_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    title="Dao",
    type=aws_apigateway.JsonSchemaType.OBJECT,
    properties={
        "discord_server_id": discord_server_id_schema,
        "name": dao_name_schema,
        "badges": badge_names_schema,
        "created_datetime": created_datetime_schema,
        "image_url": image_url_schema,
        "description": description_schema,
    },
    required=["discord_server_id", "name", "badge_names_schema", "created_datetime"],
)

# HANDLER REQUEST/RESPONSE
# AUTHENTICATE PLATFORM REQUEST/RESPONSE
authenticate_platform_request_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    title="Authenticate Platform Request",
    type=aws_apigateway.JsonSchemaType.OBJECT,
    properties={
        "platform": platform_schema,
        "authorization_code": auth_code_schema,
        "scopes": scopes_schema,
    },
    required=["platform", "authorization_code", "scopes"],
)


# BADGE HANDLER REQUESTS AND RESPONSES
mint_badge_request_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    title="Mint Badge Request",
    type=aws_apigateway.JsonSchemaType.OBJECT,
    properties={
        "address": address_schema,
        "name": badge_name_schema,
        "platform": platform_schema,
        "description": description_schema,
    },
    required=["address"],
)

mint_badge_response_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    title="Mint Badge Response",
    type=aws_apigateway.JsonSchemaType.OBJECT,
    properties={"body": badge_schema},
)

list_badges_response_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    title="List Badges Response",
    type=aws_apigateway.JsonSchemaType.ARRAY,
    items=badge_schema,
)

# ACCOUNT HANDLER REQUESTS AND RESPONSES
create_account_request_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    title="Mint Badge Request",
    type=aws_apigateway.JsonSchemaType.OBJECT,
    properties={
        "account_id": account_id_schema,
        "platform": platform_schema,
        "metamask_id": metamask_id_schema,
        "server_id": discord_server_id_schema,
        "role_id": discord_role_id_schema,
    },
    required=["account_id", "platform", "metamask_id"],
)

create_account_response_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    title="Create Account Response",
    type=aws_apigateway.JsonSchemaType.OBJECT,
    properties={"body": account_schema},
)

list_accounts_response_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    title="List Accounts Response",
    type=aws_apigateway.JsonSchemaType.ARRAY,
    items=account_schema,
)

# DAO HANDLER REQUESTS AND RESPONSES
create_dao_request_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    title="Create DAO Request",
    type=aws_apigateway.JsonSchemaType.OBJECT,
    properties={
        "discord_server_id": discord_server_id_schema,
        "dao_name": dao_name_schema,
        "badges": badge_names_schema,
        "description": description_schema,
        "image_url": image_url_schema,
    },
    required=["discord_server_id", "dao_name", "metamask_id"],
)

create_dao_response_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    title="Create DAO Response",
    type=aws_apigateway.JsonSchemaType.OBJECT,
    properties={"body": dao_schema},
)

list_daos_response_schema = aws_apigateway.JsonSchema(
    schema=aws_apigateway.JsonSchemaVersion.DRAFT7,
    title="List DAOs Response",
    type=aws_apigateway.JsonSchemaType.ARRAY,
    items=dao_schema,
)
