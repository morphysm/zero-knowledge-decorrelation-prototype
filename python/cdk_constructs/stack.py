"""Stack for Badges project."""
from typing import Any

from aws_cdk import core

from python.cdk_constructs.api import Api
from python.cdk_constructs.dynamo import Dynamo


class ZicoBadgesStack(core.Stack):
    def __init__(
        self,
        scope: core.Construct,
        id: str,
        **kwargs: Any,
    ) -> None:
        """Stack representing one instance of the Badge service.

        A "stack" is a collection of resources that AWS cloudformation
        manages as one group. See:
            https://docs.aws.amazon.com/AWSCloudFormation/latest/AccountGuide/stacks.html

        Currently contains:
            API construct containing a full rest API with lambda
                handlers for all endpoints.
            Dynamo construct with account and badge tables.

        args:
            scope: construct that is scope for this stack. All CDK
                resources except the top level "app" require a scope.
            construct_id: ID.
            **kwargs: arbitrary arguments passed to superclass constructor.
        """
        super().__init__(scope=scope, id=id, **kwargs)

        self.dynamo = Dynamo(scope=self, id=f"{id}Database")
        self.api = Api(
            scope=self,
            id=f"{id}Api",
            accounts_table=self.dynamo.accounts_table,
            badges_table=self.dynamo.badges_table,
            daos_table=self.dynamo.daos_table,
        )
