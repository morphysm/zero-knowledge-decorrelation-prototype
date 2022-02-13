"""Stack for Badges project."""
from typing import Any

from aws_cdk import core
from python.cdk_constructs.api import Api


class ZicoBadgesStack(core.Stack):
    def __init__(
        self,
        scope: core.Construct,
        id: str,
        **kwargs: Any,
    ) -> None:
        """Stack representing one instance of the Badge service.

        Currently contains:
            API stack containing a full rest API with lambda
                handlers for all endpoints.

        args:
            scope: construct that is scope for this stack. All CDK
                resources except the top level "app" require a scope.
            construct_id: ID.
            **kwargs: arbitrary arguments passed to superclass constructor.
        """
        super().__init__(scope=scope, id=id, **kwargs)

        Api(scope=self, id=f"{id}Api")
