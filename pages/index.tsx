import React from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import Header from '../src/parts/header'
import Main from '../src/parts/mainContent'
import Footer from '../src/parts/footer'
import styles from '../styles/pages.module.scss'
import User from '../src/types/user'

const HomePage: NextPage = () => {
    return (
        <div id={styles.container}>
            <Header page="home"/>
            <Main />
            <Footer />
        </div>
    )
}

export default HomePage
