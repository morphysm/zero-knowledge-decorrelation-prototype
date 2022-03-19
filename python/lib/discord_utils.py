"""Utilities for working with the discord API.

https://discord.com/developers/docs
"""
import logging
import os
from typing import List

import discord  # type: ignore
import requests

from python.lib.badge import Badge
from python.lib.enums import Platform
from python.lib.oauth_utils import OAuthToken

logger = logging.getLogger("lib.discord_utils")

DISCORD_API_ENDPOINT = "https://discord.com/api/v8"
DISCORD_BOT_TOKEN = "OTQ1MDYxNjM2NDAwNjI3Nzgz.YhKrPA.I3RChpAAm71iwBDF31CcsAOjGFA"


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


async def get_badges(client: discord.Client) -> List[Badge]:
    auth_token = os.environ["DISCORD_TOKEN"]
    client = get_discord_client()


async def get_all_users(client: discord.Client) -> List:
    async for guild in client.fetch_guilds(limit=150):
        logger.info(guild)
        for member in guild.members:
            roles = member.roles
            raise ValueError(member)
        raise ValueError(guild)


async def get_discord_client(
    auth_token: str,
) -> discord.Client:
    """Create and login a Discord bot client.

    Note: the auth token MUST be for a bot. Using a user
    token is a violation of discord's terms of service.

    See:
        *https://discordpy.readthedocs.io/en/stable/api.html#discord.Client.login
        *https://support.discord.com/hc/en-us/articles/115002192352
    """
    client = discord.Client()
    await client.login(auth_token)
    return client


async def get_badges_for_guild(
    client: discord.Client,
    guild_id: str,
    limit: int = 100,
) -> List[Badge]:
    """Return all of the badges a DAO would want to mint."""
    guild = await client.fetch_guild(guild_id)
    roles = await guild.fetch_roles()

    badges: List[Badge] = list()

    for role in roles:
        badges.append(
            Badge(
                id=role.id,
                name=role.name,
                platform=Platform.DISCORD,
            )
        )
    return badges
