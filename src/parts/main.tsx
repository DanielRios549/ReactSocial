import React from 'react'
import Box from '../components/box'
import UserSidebar from '../components/userSidebar'
import styles from '../../styles/parts/main.module.scss'

type Posts = {
    text?: string
}

const Main: React.FC = () => {
    const user = 'DanielRios549'
    const sidebar = ['Communities', 'Friends']
    const sidebarItems = [
        [  // Communities
            {'name': 'Felipe Deschamps'},
            {'name': 'Diego Fernandes'}
        ],
        [  // Friends
            {'name': 'Alura'},
            {'name': 'Rocketseat'}
        ]
    ]
    const [posts, setPosts] = React.useState<Posts[]>([])

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
                <UserSidebar user={user}/>
            </Box>
            <Box single area="wellcome" tag="article">
                <h1>Wellcome {user}!</h1>
            </Box>
            <Box single area="form" tag="article">
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
            <Box area="posts" tag="article">{
                posts.map((post, index) => (
                    <article key={index}>{
                        post.text
                    }</article>
                ))
            }</Box>
            <Box area="aside" tag="aside">{
                sidebarItems.map((side, number) => (
                    <section key={number}>
                        <h2>{sidebar[number]}</h2>
                        <ul>{
                            side.map((item, index) => (
                                <li key={index}>{
                                    item.name
                                }</li>
                            ))
                        }</ul>
                    </section>
                ))
            }</Box>
        </main>
    )
}

export default Main