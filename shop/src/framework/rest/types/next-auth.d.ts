import { DefaultProfile, DefaultSession } from 'next-auth'
declare module 'next-auth' {
    export interface Provider {
        callbackUrl: string
        id: string
        name: string
        signinUrl: string
        type: string
    }

    interface Session {
        user: {
            /** The user's role */
            id: string
        } & DefaultSession['user']
        accessToken: string
        provider: Provider | string
    }
    interface Token {
        refreshToken: string
        jwt: string
        access_token: string
        id: string
        accessTokenExpires: string
    }
    interface Account {
        provider: string
        expires_in: string
        access_token: string
        refreshToken: string
    }
    interface Profile {
        profile: { picture: string; role: string } & DefaultProfile['image']
    }
}
