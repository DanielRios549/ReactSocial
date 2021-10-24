import type { GetStaticProps, NextPage } from 'next'
import User from '../src/types/user'
import Header from '../src/parts/header'
import Main from '../src/parts/mainContent'
import Footer from '../src/parts/footer'
import styles from '../styles/app.module.scss'

const Home: NextPage<User> = (props) => {
    return (
        <div id={styles.container}>
            <Header menu={true} page="home"/>
            <Main user={props.user} name={props.name} image={props.image}/>
            <Footer />
        </div>
    )
}

export const getStaticProps: GetStaticProps<User> = async () => {
    const dev = process.env.NODE_ENV !== 'production'
    const server = dev === true ? 'http://localhost:3000' : 'https://react-social-danielrios549.vercel.app'
    const url = `${server}/api/user`

    const data: User = await fetch(url).then(async (info) => {
        return info.json()
    })
    
    return {
        props: {
            user: data.user,
            name: data.name,
            image: data.image
        },
        revalidate: 30
    }
}

export default Home
