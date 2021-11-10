import { NextPage } from 'next'
import Header from '../src/parts/header'
import LoginContent from '../src/parts/loginContent'
import Footer from '../src/parts/footer'
import styles from '../styles/pages.module.scss'

const LoginPage: NextPage = () => {
    return (
        <div id={styles.container}>
            <Header noMenu noSearch page="login"/>
            <LoginContent />
            <Footer />
        </div>
    )
}

export default LoginPage