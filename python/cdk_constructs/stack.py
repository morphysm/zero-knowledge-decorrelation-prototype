"""Stack for Badges project."""
from typing import Any

import aws_cdk
import constructs


class Stack(constructs.Construct):
    def __init__(
        self,
        scope: constructs.Construct,
        constuct_id: str,
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
        super().__init__(scope, construct_id, **kwargs)

        self.api = Api(scope=self)
