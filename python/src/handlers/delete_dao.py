import logging
from typing import Any, Dict

from lib.database_models import DaoModel


logger = logging.getLogger("delete_account_handler")


def delete_dao_handler(event: Dict, context: Any) -> Dict:
    try:
        discord_server_id = event["pathParameters"]["dao"]
    except KeyError:
        logger.error(event["pathParameters"])
        return dict()
    try:
        DaoModel.delete(discord_server_id)
    except DaoModel.DoesNotExist:
        return {"statusCode": 404}

    return {"statusCode": 200}
