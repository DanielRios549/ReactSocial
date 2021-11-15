import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Box from '../components/box'
import UserSidebar from '../components/sidebar'
import Stats from '../components/stats'
import Post from '../components/post'
import Relations from '../components/relations'
import Relation from '../types/relation'
import { PostForm } from '../types/post'
import { useAuth, usePost } from '../hooks/useContext'
import styles from '../../styles/parts/mainContent.module.scss'


const Main: React.FC = () => {
    const {posts, addPost} = usePost()
    const {register, handleSubmit} = useForm<PostForm>()

    const [communities, setCommunities] = useState<Relation[]>([])
    const {user, following, followers} = useAuth()

    const handlePost = (data: PostForm) => {
        if (data.text.trim().length > 0) {
            addPost({
                text: data.text,
                user: user.username,
                image: user.image
            })
        }
    }

    return (
        <main id={styles.main}>
            <Box single hide area="panel" tag="aside">
                <UserSidebar/>
            </Box>
            <Box single area="wellcome" tag="section">
                <h1>Wellcome {user.name}!</h1>
                <Stats/>
            </Box>
            <Box single area="form" tag="section">
                <h2>Let's Start</h2>
                <form onSubmit={handleSubmit(handlePost)}>
                    <input 
                        {...register('text', { required: true })}
                        type="text"
                        placeholder="What is in your mind"
                        name="text"
                        aria-label="What is in your mind"
                    />
                </form>
            </Box>
            <Box area="posts" tag="section">{
                posts.map((post, index) => (
                    <Post text={post.text} user={post.user} image={post.image} key={index}/>
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