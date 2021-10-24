import React, { useEffect, useState } from 'react'
import Box from '../components/box'
import UserSidebar from '../components/userSidebar'
import User from '../types/user'
import Relations from '../components/relations'
import Relation from '../types/relation'
import Post from '../types/post'
import styles from '../../styles/parts/main.module.scss'

const Main: React.FC<User> = (props) => {
    const [posts, setPosts] = useState<Post[]>([])
    
    const [communities, setCommunities] = useState<Relation[]>([])
    const [following, setFollowing] = useState<Relation[]>([])

    useEffect(() => {
        fetch('/api/post', {
            method: 'POST',
        })
        .then(async (dato) => {
            const response = await dato.json()
            setPosts([...posts, ...response.data.allPosts])
        })
    }, [])

    const handleForm = (event: any) => {
        event.preventDefault()
        let form = new FormData(event.target)
        let data = {
            text: form.get('post')?.toString()
        }

        if ((data.text !== undefined) && (data.text.length > 0)) {
            setPosts([...posts, data])
        }
    }

    return (
        <main id={styles.main}>
            <Box single key="panel" area="panel" tag="aside">
                <UserSidebar user={props.user}/>
            </Box>
            <Box single key="wellcome" area="wellcome" tag="article">
                <h1>Wellcome {props.name}!</h1>
            </Box>
            <Box single key="form" area="form" tag="article">
                <h2>Let's Start</h2>
                <form onSubmit={handleForm}>
                    <input 
                        type="text"
                        placeholder="What is in your mind"
                        name="post"
                        aria-label="What is in your mind"
                    />
                </form>
            </Box>
            <Box key="posts" area="posts" tag="article">{
                posts.map((post, index) => (
                    <article key={index}>{
                        post.text
                    }</article>
                ))
            }</Box>
            <Box key="aside" area="aside" tag="aside">{
                <>
                    <Relations key="Communities" name="Communities" items={communities}/>
                    <Relations key="Following" name="Following" items={following}/>
                </>
            }</Box>
        </main>
    )
}

export default Main