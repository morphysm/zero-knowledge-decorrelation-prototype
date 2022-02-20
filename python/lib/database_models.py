from pynamodb.attributes import UnicodeAttribute, UTCDateTimeAttribute
from pynamodb.models import Model


class BadgeModel(Model):
    """A Badge as represented in Dynamo DB."""

    id = UnicodeAttribute(hash_key=True)
    name = UnicodeAttribute()
    address = UnicodeAttribute()
    platform = UnicodeAttribute()
    status = UnicodeAttribute()
    created_datetime = UTCDateTimeAttribute(null=True, default=None)
    description = UnicodeAttribute(null=True, default=None)
    image_url = UnicodeAttribute(null=True, default=None)
