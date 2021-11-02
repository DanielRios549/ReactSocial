import React, { useEffect, useState } from 'react'
import Box from '../components/box'
import UserSidebar from '../components/userSidebar'
import User from '../types/user'
import Stats from '../components/stats'
import Post from '../components/post'
import Relations from '../components/relations'
import Relation from '../types/relation'
import { useAuth, usePost } from '../hooks/useContext'
import styles from '../../styles/parts/main.module.scss'

const Main: React.FC<User> = (props) => {
    const { posts, setPosts } = usePost()
    
    const [communities, setCommunities] = useState<Relation[]>([])
    const { following } = useAuth()

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
                <UserSidebar user={props.user} image={props.image}/>
            </Box>
            <Box single key="wellcome" area="wellcome" tag="section">
                <h1>Wellcome {props.name}!</h1>
                <Stats user={props.user}/>
            </Box>
            <Box single key="form" area="form" tag="section">
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
            <Box key="posts" area="posts" tag="section">{
                posts.map((post, index) => (
                    <Post creator={post.text} key={index}/>
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