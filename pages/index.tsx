import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../src/parts/header'
import Main from '../src/parts/main'
import Footer from '../src/parts/footer'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <Main />
            <Footer />
        </div>
    )
}

export default Home
