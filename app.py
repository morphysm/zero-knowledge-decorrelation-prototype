import os

from aws_cdk import core

from python.cdk_constructs.stack import ZicoBadgesStack

app = core.App()

ZicoBadgesStack(
    scope=app,
    id="Badges",
    env=core.Environment(account="920316314555", region="us-east-1"),
)
app.synth()
