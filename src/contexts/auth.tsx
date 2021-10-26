import React, { createContext, useState } from 'react'
import Router from 'next/router'
import nookies from 'nookies'

type User = {
    username: string
}

type Auth = {
    user: User | undefined
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
    signIn: (data: User) => Promise<User | any>
    verify: (token: string) => any
}

export const AuthContext = createContext({} as Auth)

export const AuthProvider: React.FC = (props: any) => {
    const [user, setUser] = useState<User>()

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
            const {token} = await response.json()

            nookies.set(null, 'token', token, {
                path: '/',
                maxAge: 86400, // 1 day
            })

            setUser({username})
            Router.push('/')
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
        <AuthContext.Provider value={{user, setUser, signIn, verify}}>
            {props.children}
        </AuthContext.Provider>
    )
}

// Custom Hook to use AuthContext

export const useAuth = () => React.useContext(AuthContext)
