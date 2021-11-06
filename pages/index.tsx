import React from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import User from '../src/types/user'
import Header from '../src/parts/header'
import Main from '../src/parts/mainContent'
import Footer from '../src/parts/footer'
import styles from '../styles/pages.module.scss'

const HomePage: NextPage<User> = (props) => {
    return (
        <div id={styles.container}>
            <Header menu={true} page="home"/>
            <Main username={props.username} name={props.name} image={props.image}/>
            <Footer />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<User> = async (context) => {
    const url = process.env.SITE_URL
    const {token} = nookies.get(context)

    const moveToLogin = () => {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    // Verify if the user is authenticated

    if (token !== undefined) {
        const {isAuthenticated} = await fetch(url + '/api/auth', {
            method: 'POST',
            headers: {
                'Authorization': `${token}`
            }
        })
        .then((response) => response.json())

        // Redirect to login if token is not valid

        if (isAuthenticated !== true) {
            return moveToLogin()
        }

        // Get user data if token is valid

        else {
            const { username, name, image } = jwt.decode(token) as User
            
            return {
                props: {username, name, image}
            }
        }
    }

    // Redirect to login if token does not exists

    else {
        return moveToLogin()
    }
}

export default HomePage
