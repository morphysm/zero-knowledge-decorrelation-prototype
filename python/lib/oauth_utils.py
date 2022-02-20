"""Utilities for interfacing with different platforms OAuth2 implementations.

Good OAuth guide here: https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2
"""
from dataclasses import dataclass
from typing import List


@dataclass
class OAuthToken:
    """Basic representation of an OAuth token."""

    access_token: str
    token_type: str
    expiries_in: int
    refresh_token: str
    scopes: List[str]
