import json
import logging
from typing import Any, Dict

from lib.database_models import DaoModel


logger = logging.getLogger("delete_dao_handler")


def delete_dao_handler(event: Dict, context: Any) -> Dict:
    discord_server_id = event["pathParameters"]["dao"]

    try:
        dao = DaoModel.get(discord_server_id)
        logger.info(f"Deleting DAO with server ID {discord_server_id}")
        dao.delete()
    except DaoModel.DoesNotExist:
        message = f"Dao with Discord Server ID {discord_server_id} not found"
        logger.exception(message)
        return {"statusCode": 404, "body": json.dumps({"message": message})}

    return {"statusCode": 200}
