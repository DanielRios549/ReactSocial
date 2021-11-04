import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Box from '../components/box'
import UserSidebar from '../components/sidebar'
import User from '../types/user'
import Stats from '../components/stats'
import Post from '../components/post'
import Relations from '../components/relations'
import Relation from '../types/relation'
import { useAuth, usePost } from '../hooks/useContext'
import styles from '../../styles/parts/main.module.scss'

const Main: React.FC<User> = (props) => {
    const {posts, addPost} = usePost()
    const {register, handleSubmit} = useForm()

    const [communities, setCommunities] = useState<Relation[]>([])
    const {user, following, followers} = useAuth()

    const handlePost = (data: any) => {
        const username = user.username !== undefined ? user.username : undefined

        if (username === undefined) {
            console.error('There is a problem to get logged user.')
        }
        else {
            addPost({
                text: data.text,
                user: username,
                image: props.image
            })
        }
    }

    return (
        <main id={styles.main}>
            <Box single area="panel" tag="aside">
                <UserSidebar user={props.username} image={props.image}/>
            </Box>
            <Box single area="wellcome" tag="section">
                <h1>Wellcome {props.name}!</h1>
                <Stats user={props.username}/>
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