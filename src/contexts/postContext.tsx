import React, { useEffect, createContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import PostInfo from '../types/post'

type Post = {
    posts: PostInfo[]
    addPost: (data: PostInfo) => void
}


export const PostContext = createContext({} as Post)

export const PostProvider: React.FC = (props: any) => {
    const [posts, setPosts] = useLocalStorage<PostInfo[]>('posts', [])

    useEffect(() => getPosts(), [])

    const getPosts = () => {
        if (posts.length === 0) {
            fetch('/api/post', {
                method: 'POST',
            })
            .then(async (dato) => {
                const response = await dato.json()
                setPosts(response.data.allPosts)
            })
        }
    }

    const addPost = (data: PostInfo) => {
        const {text, user} = data

        if (user !== undefined) {
            setPosts([...posts, {text, user}])
        }
    }

    return (
        <PostContext.Provider value={{posts, addPost}}>
            {props.children}
        </PostContext.Provider>
    )
}