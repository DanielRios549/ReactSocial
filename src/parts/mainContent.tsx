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

    const stats = {
        url: 'https://github-readme-stats.vercel.app/api',
        user: `username=${props.user}`,
        theme: 'theme=react',
        background: 'bg_color=242526',
        border: 'hide_border=true',
        langs: 'langs_count=7',
        icons: 'show_icons=true',
        commits: 'include_all_commits=true'
    }

    const commonStats = `${stats.user}&${stats.theme}&${stats.border}&${stats.background}`

    return (
        <main id={styles.main}>
            <Box single key="panel" area="panel" tag="aside">
                <UserSidebar user={props.user} image={props.image}/>
            </Box>
            <Box single key="wellcome" area="wellcome" tag="article">
                <h1>Wellcome {props.name}!</h1>
                <section role="stats_frame">
                    <img role="stats" alt="stats" src={`${stats.url}?${commonStats}&${stats.icons}&${stats.commits}&hide_rank=true`} />
                    <img role="stats" alt="langs" src={`${stats.url}/top-langs/?${commonStats}&${stats.langs}&layout=compact`} />
                </section>
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