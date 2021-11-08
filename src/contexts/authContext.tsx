import React, { createContext } from 'react'
import Router from 'next/router'
import nookies from 'nookies'
import User from '../types/user'
import Relation from '../types/relation'
import { useLocalStorage } from '../hooks/useStorage'

type Auth = {
    // States

    user: User
    following: Relation[]
    followers: Relation[]

    // Setters

    setUser: React.Dispatch<React.SetStateAction<User>>
    setFollowing: React.Dispatch<React.SetStateAction<Relation[]>>
    setFollowers: React.Dispatch<React.SetStateAction<Relation[]>>

    // API Functions

    signIn: (data: User) => Promise<User | any>
    signOut: () => void
}

export const AuthContext = createContext({} as Auth)

export const AuthProvider: React.FC = (props: any) => {
    const [user, setUser] = useLocalStorage<User>('user', {})
    const [following, setFollowing] = useLocalStorage<Relation[]>('following', [])
    const [followers, setFollowers] = useLocalStorage<Relation[]>('followers', [])

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
            const {token, username, name, image, following, followers} = await response.json()

            // Create the cookie if API returns the token

            if (token !== undefined) {
                nookies.set(null, 'token', token, {
                    path: '/',
                    maxAge: 86400,  // 1 day
                })

                setUser({username, name, image})
                setFollowing(following)
                setFollowers(followers)

                Router.push('/')
            }
        })
    }
    const signOut = () => {
        nookies.destroy(null, 'token')
        localStorage.clear()

        Router.push('/login')
    }
    return (
        <AuthContext.Provider value={{user, following, followers, setUser, setFollowing, setFollowers, signIn, signOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}
