import React from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import Header from '../src/parts/header'
import Footer from '../src/parts/footer'
import Box from '../src/components/box'
import app from '../styles/pages.module.scss'
import styles from '../styles/parts/mainContent.module.scss'

const Error404Page: NextPage = () => {
    return (
        <div id={app.container}>
            <Header menu={false} page="home"/>
            <main id={styles.main}>
                <Box noBackground area="form">
                    <Image src="/images/404.png" alt="404" width={300} height={100} layout="responsive"/>
                </Box>
            </main>
            <Footer />
        </div>
    )
}

export default Error404Page
