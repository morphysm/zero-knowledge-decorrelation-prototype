"""Pynamo ORN models for working with database objects.

https://pynamodb.readthedocs.io/en/latest/tutorial.html#getting-started
"""
from pynamodb.attributes import (
    JSONAttribute,
    ListAttribute,
    UnicodeAttribute,
    UTCDateTimeAttribute,
)
from pynamodb.models import Model


class AccountModel(Model):
    class Meta:
        table_name = "Accounts"

    account_id = UnicodeAttribute(hash_key=True)
    platform = UnicodeAttribute(range_key=True)
    badges: ListAttribute[str] = ListAttribute(default=list)
    metamask_id = UnicodeAttribute()

    # Discord only fields
    server_id = UnicodeAttribute(null=True, default=None)
    role_id = UnicodeAttribute(null=True, default=None)


class BadgeModel(Model):
    """A Badge as represented in Dynamo DB."""

    class Meta:
        table_name = "Badges"

    address = UnicodeAttribute(hash_key=True)
    account_id = UnicodeAttribute(range_key=True)

    name = UnicodeAttribute()
    platform = UnicodeAttribute()
    status = UnicodeAttribute()
    created_datetime = UTCDateTimeAttribute(null=True, default=None)
    description = UnicodeAttribute(null=True, default=None)
    image_url = UnicodeAttribute(null=True, default=None)


class DaoModel(Model):
    """A DAO as represented in Dynamo DB."""

    class Meta:
        table_name = "Daos"

    discord_server_id = UnicodeAttribute(hash_key=True)

    name = UnicodeAttribute()
    badges = JSONAttribute(null=True, default=None)
    created_datetime = UTCDateTimeAttribute(null=True, default=None)
    description = UnicodeAttribute(null=True, default=None)
    image_url = UnicodeAttribute(null=True, default=None)
