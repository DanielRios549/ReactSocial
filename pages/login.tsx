import { NextPage } from 'next'
import Header from '../src/parts/header'
import LoginForm from '../src/parts/loginForm'
import Footer from '../src/parts/footer'
import styles from '../styles/app.module.scss'

const LoginPage: NextPage = () => {
    return (
        <div id={styles.container}>
            <Header menu={false} page="login"/>
            <LoginForm />
            <Footer />
        </div>
    )
}

export default LoginPage