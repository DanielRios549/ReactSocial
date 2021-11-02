import React, { useEffect, createContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import PostInfo from '../types/post'

type Post = {
    posts: PostInfo[]
    setPosts: React.Dispatch<React.SetStateAction<PostInfo[]>>
}


export const PostContext = createContext({} as Post)

export const PostProvider: React.FC = (props: any) => {
    const [posts, setPosts] = useLocalStorage<PostInfo[]>('posts', [])

    useEffect(() => {
        if (posts.length === 0) {
            fetch('/api/post', {
                method: 'POST',
            })
            .then(async (dato) => {
                const response = await dato.json()
                setPosts([...posts, ...response.data.allPosts])
            })
        }
    }, [])

    const update = () => {
        
    }

    return (
        <PostContext.Provider value={{posts, setPosts}}>
            {props.children}
        </PostContext.Provider>
    )
}