"""NoSQL database for storing badge and account data."""

from aws_cdk import aws_dynamodb, core

from python.lib.database_models import AccountModel, BadgeModel


class Dynamo(core.Construct):
    def __init__(self, scope: core.Construct, id: str) -> None:
        """Define Dynamo tables."""
        super().__init__(scope=scope, id=id)

        self.badges_table = aws_dynamodb.Table(
            scope=self,
            id=BadgeModel.Meta.table_name,
            table_name=BadgeModel.Meta.table_name,
            partition_key=aws_dynamodb.Attribute(
                name="address", type=aws_dynamodb.AttributeType.STRING
            ),
            sort_key=aws_dynamodb.Attribute(
                name="account_id", type=aws_dynamodb.AttributeType.STRING
            ),
        )
        self.accounts_table = aws_dynamodb.Table(
            scope=self,
            id=AccountModel.Meta.table_name,
            table_name=AccountModel.Meta.table_name,
            partition_key=aws_dynamodb.Attribute(
                name="account_id", type=aws_dynamodb.AttributeType.STRING
            ),
            sort_key=aws_dynamodb.Attribute(
                name="platform", type=aws_dynamodb.AttributeType.STRING
            ),
        )
