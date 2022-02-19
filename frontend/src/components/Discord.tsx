//here lies types for the api response...

//after auth we get this data
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
    return null;
}

export { Discord }