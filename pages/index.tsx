import type { GetServerSideProps, NextPage } from 'next'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import User from '../src/types/user'
import Header from '../src/parts/header'
import Main from '../src/parts/mainContent'
import Footer from '../src/parts/footer'
import styles from '../styles/app.module.scss'

const HomePage: NextPage<User> = (props) => {
    return (
        <div id={styles.container}>
            <Header menu={true} page="home"/>
            <Main user={props.user} name={props.name} image={props.image}/>
            <Footer />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<User> = async (context) => {
    const dev = process.env.NODE_ENV !== 'production'

    // While in development, set both LOCAL_URL and VERCEL_URL to localhost,
    // In order to test using `yarn start` that simulates the production environment.

    const server = dev === true ? process.env.LOCAL_URL : process.env.VERCEL_URL
    const url = `${server}/api/user`

    // TODO: Stop using external API to authenticate user

    const authUrl = 'https://alurakut.vercel.app/api/auth'

    const cookie = nookies.get(context)
    const token = cookie.token

    // Verify if the user is authenticated

    const { isAuthenticated } = await fetch(authUrl, {
        headers: {
            Authorization: token
        }
    }) 
    .then(res => res.json())

    // Redirect to login if token is not valid

    if (!isAuthenticated) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    // Get user data if token is valid

    else {
        const { githubUser } = jwt.decode(token) as any

        const data: User = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: githubUser
            })
        })
        .then(async (info) => await info.json())
        
        return {
            props: {
                user: data.user,
                name: data.name,
                image: data.image
            }
        }
    }
}

export default HomePage
