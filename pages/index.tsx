import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import User from '../src/types/user'
import Header from '../src/parts/header'
import Main from '../src/parts/mainContent'
import Footer from '../src/parts/footer'
import styles from '../styles/app.module.scss'
import React from 'react'

const HomePage: NextPage<User> = (props) => {
    return (
        <div id={styles.container}>
            <Header menu={true} page="home"/>
            <Main user={props.user} name={props.name} image={props.image}/>
            <Footer />
        </div>
    )
}

//export const getStaticProps: GetStaticProps<User> = async (context) => {
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
            const { user, name, image } = jwt.decode(token) as User
            
            return {
                props: {user, name, image}
            }
        }
    }

    // Redirect to login if token does not exists

    else {
        return moveToLogin()
    }
}

export default HomePage
