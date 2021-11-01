import React, { createContext, useState } from 'react'
import Router from 'next/router'
import nookies from 'nookies'
import Relation from '../types/relation'
import { useLocalStorage } from '../hooks/useLocalStorage'

type User = {
    username: string
}

type Auth = {
    // States

    user: User | undefined
    following: Relation[]

    // Setters

    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
    setFollowing: React.Dispatch<React.SetStateAction<Relation[]>>

    // API Functions

    signIn: (data: User) => Promise<User | any>
    verify: (token: string) => any
}

export const AuthContext = createContext({} as Auth)

export const AuthProvider: React.FC = (props: any) => {
    const [user, setUser] = useState<User>()
    const [following, setFollowing] = useLocalStorage<Relation[]>('following', [])

    const signIn = async ({username}: User) => {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'user': username
            })
        })
        .then(async (response) => {
            const {token, following} = await response.json()

            // Create the cookie if API returns the token

            if (token !== undefined) {
                nookies.set(null, 'token', token, {
                    path: '/',
                    maxAge: 86400, // 1 day
                })   

                setUser({username})
                setFollowing(following)
                Router.push('/')
            }
        })
    }

    const verify = async (token: string) => {
        fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Authorization': `${token}`
            }
        })
        .then(async (response) => response)
    }

    return (
        <AuthContext.Provider value={{user, following, setUser, setFollowing, signIn, verify}}>
            {props.children}
        </AuthContext.Provider>
    )
}
