import React, { createContext, useContext, useState, ReactNode } from 'react';

import * as AuthSession from 'expo-auth-session'

import {
    redirect_uri,
    scope,
    response_type,
    client_id,
    cdn_image
} from '../Config'
import { api } from '../Services/api';

type User = {
    id: string
    username: string
    firstName: string
    avatar: string
    email: string
    token: string
}

type AuthContextData = {
    user: User
    loading: boolean
    signIn: () => Promise<void>
}

type AuthProviderProps = {
    children: ReactNode
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token: string
    }
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User)
    const [loading, setLoading] = useState(false)

    function avatar() {

    }

    async function signIn() {
        try {
            setLoading(true)
            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`

            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

            if (type === 'success') {
                api.defaults.headers.authorization = `Bearer ${params.access_token}`

                const userInfo = await api.get('users/@me')
                const firstName = userInfo.data.username.split('')[0]

                const avatarFileFormat = userInfo.data.avatar.substring(0, 2) !== 'a_' ? ".png" : ".gif"
                userInfo.data.avatar = `${cdn_image}/avatars/${userInfo.data.id}/${userInfo.data.avatar}${avatarFileFormat}`

                setUser({
                    ...userInfo.data,
                    firstName,
                    token: params.access_token
                })

                setLoading(false)
            } else {
                setLoading(false)
            }

        } catch (error) {
            throw new Error("Não foi possivel autenticar");

        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)
    return context
}

export {
    AuthProvider,
    useAuth
}
