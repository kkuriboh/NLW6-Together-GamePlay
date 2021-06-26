import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import * as AuthSession from 'expo-auth-session'

import AsyncStorage from '@react-native-async-storage/async-storage';

const { redirect_uri } = process.env
const { scope } = process.env
const { response_type } = process.env
const { client_id } = process.env
const { cdn_image } = process.env

import { api } from '../Services/api';
import { collection_users } from '../Config/database'

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
    signOut: () => Promise<void>
}

type AuthProviderProps = {
    children: ReactNode
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token?: string
        error?: string
    }
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User)
    const [loading, setLoading] = useState(false)

    async function signIn() {
        try {
            setLoading(true)
            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`

            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

            if (type === 'success' && !params.error) {
                api.defaults.headers.authorization = `Bearer ${params.access_token}`

                const userInfo = await api.get('users/@me')
                const firstName = userInfo.data.username.split('')[0]

                const avatarFileFormat = userInfo.data.avatar.substring(0, 2) !== 'a_' ? ".png" : ".gif"
                userInfo.data.avatar = `${cdn_image}/avatars/${userInfo.data.id}/${userInfo.data.avatar}${avatarFileFormat}`

                const userData = {
                    ...userInfo.data,
                    firstName,
                    token: params.access_token
                }

                await AsyncStorage.setItem(collection_users, JSON.stringify(userData))
                setUser(userData)
            }

        } catch (error) {
            throw new Error("Não foi possivel autenticar");

        } finally {
            setLoading(false)
        }
    }

    async function signOut() {
        setUser({} as User)
        await AsyncStorage.removeItem(collection_users)
    }

    async function loadUserStorageData() {
        const storage = await AsyncStorage.getItem(collection_users)
        if (storage) {
            const userLogged = JSON.parse(storage) as User
            api.defaults.headers.authorization = `Bearer ${userLogged.token}`
        }
    }
    useEffect(() => {
        loadUserStorageData()
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signIn,
            signOut
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
