import React from 'react'
import Box from '../components/box'
import UserSidebar from '../components/userSidebar'
import styles from '../../styles/parts/main.module.scss'

type Posts = {
    text?: string
}

const Main: React.FC = () => {
    const [user, setUser] = React.useState('')

    React.useEffect(() => {
        fetch('/api/user').then((data) => {
            return data.json()
        })
        .then((response) => {
            setUser(response.user)
        });
    }, [])

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
            <Box single key="panel" area="panel" tag="aside">
                <UserSidebar user={user}/>
            </Box>
            <Box single key="wellcome" area="wellcome" tag="article">
                <h1>Wellcome {user}!</h1>
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
                sidebarItems.map((side, number) => (
                    <section key={number}>
                        <h2>{`${sidebar[number]} (${side.length})`}</h2>
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