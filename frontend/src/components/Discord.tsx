import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useEffect, useState } from 'react';


//here lies types for the api response...

interface IDiscordAuthProps {
    // tokenType: string
    // accessToken: string
}

//current user
export interface AuthenticatedUser {
    accent_color: number;
    avatar: string;
    banner?: any;
    banner_color: string;
    discriminator: string;
    flags: number;
    id: string;
    locale: string;
    mfa_enabled: boolean;
    public_flags: number;
    username: string;
}
//the disc api response is a list of GuildMember meaning it's {GuildMember, GuildMember, ...}
//however, there is no key name to the root object so idk if this will line up as I have my key as 'root'.

export interface GuildMembers {
    root: GuildMember[]
}

export interface GuildMember {
    roles: string[];
    nick?: any;
    avatar?: any;
    premium_since?: any;
    joined_at: Date;
    is_pending: boolean;
    pending: boolean;
    communication_disabled_until?: any;
    user: User;
    mute: boolean;
    deaf: boolean;
}

export interface User {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
}




const Discord: React.FunctionComponent<IDiscordAuthProps> = (props) => {

    const API_ENDPOINT = 'https://discord.com/api/v8/oauth2/token';
    const CLIENT_ID = '945061636400627783';
    const CLIENT_SECRET = 'redacted - pm me for it :). I will make them as env variables of course i just cba to at the time'; //TODO: read from env var obvi.
    //should probably read the testing env from a file but it's a hackathon so who cares. 
    const REDIRECT_URI = 'http://localhost:3000/mint/discord';
    const code = getQueryString().get('code');

    const params = new URLSearchParams();
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);
    params.append('grant_type', 'authorization_code');
    params.append('code', String(code));
    params.append('redirect_uri', REDIRECT_URI);

    //this token will be used (frankly may not have to be in a useState hook i want to check) to make api requests.
    const [bearerToken, setToken] = useState('');
    //useEffect means when the component is ready/loaded - do this stuff.
    useEffect(() => {
        //async because we need to await the fetch response
        const getData = async () => {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                body: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const json = response.json();
            setToken(JSON.stringify(json));
        }
        getData();
    }, []);

    return null;
}

const getQueryString = (): URLSearchParams => {
    const queryString = window.location.search;
    return new URLSearchParams(queryString);
}


export { Discord }