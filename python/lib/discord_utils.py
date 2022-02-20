"""Utilities for working with the discord API.

https://discord.com/developers/docs
"""
import logging
import os
from typing import List

import requests

from python.lib.oauth_utils import OAuthToken

logger = logging.getLogger("lib.discord_utils")

DISCORD_API_ENDPOINT = "https://discord.com/api/v8"


def get_oauth_token(
    scopes: List[str],
) -> OAuthToken:
    """Get an OAuth token from discord.

    Two steps. First get the OAuth authorization code,
    then request the token.

    args:
        scope: List of OAuth scopes to apply to this function.

    See example here:
         https://discord.com/developers/docs/topics/oauth2#authorization-code-grant
    """
    try:
        client_id = os.environ["DISCORD_CLIENT_ID"]
        client_secret = os.environ["DISCORD_CLIENT_SECRET"]
    except KeyError:
        raise EnvironmentError(
            'Must export environment variables "DISCORD_CLIENT_ID" and "DISCORD_CLIENT_SECRET" to use discord.'
        )

    raise NotImplementedError(
        "We don't have a registered OAuth redirect uri with discord yet, so this function doesn't work."
    )
    redirect_uri = "www.zico.badges.com"  # not a real website

    get_oath_code_resp = requests.get(
        url=f"{DISCORD_API_ENDPOINT}/authorize",
        params={
            "client_id": client_id,
            "scopes": "%20".join(scopes),
            "redirect_uri": redirect_uri,
        },
    )
    get_oath_code_resp.raise_for_status()
    code = get_oath_code_resp.json()["body"]["code"]

    create_oauth_token_resp = requests.post(
        url=f"{DISCORD_API_ENDPOINT}/oauth2/token",
        data={
            "client_id": client_id,
            "client_secret": client_secret,
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": redirect_uri,
        },
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    create_oauth_token_resp.raise_for_status()
    return OAuthToken(**create_oauth_token_resp.json())
