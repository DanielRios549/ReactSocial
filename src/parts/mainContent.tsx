import React, { useState } from 'react'
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
    const { following, followers } = useAuth()

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
            <Box single area="panel" tag="aside">
                <UserSidebar user={props.user} image={props.image}/>
            </Box>
            <Box single area="wellcome" tag="section">
                <h1>Wellcome {props.name}!</h1>
                <Stats user={props.user}/>
            </Box>
            <Box single area="form" tag="section">
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
            <Box area="posts" tag="section">{
                posts.map((post, index) => (
                    <Post creator={post.text} key={index}/>
                ))
            }</Box>
            <Box area="aside" tag="aside">{
                <>
                    <Relations name="Communities" items={communities}/>
                    <Relations name="Following" items={following}/>
                    <Relations name="Followers" items={followers}/>
                </>
            }</Box>
        </main>
    )
}

export default Main