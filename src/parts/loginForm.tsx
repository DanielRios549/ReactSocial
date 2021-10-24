import React from 'react'
import { useRouter } from 'next/router'
import Box from '../components/box'
import styles from '../../styles/parts/login.module.scss'


const LoginForm: React.FC = () => {
    const router = useRouter()

    const handleLogin = (event: any) => {
        event.preventDefault()
        let form = new FormData(event.target)
        let data = {
            user: form.get('user')?.toString(),
        }
        router.push('/')
    }
    return (
        <main id={styles.login}>
            <Box single area="image">
                <p>Test</p>
            </Box>
            <Box single area="form">
                <form onSubmit={handleLogin} id={styles.loginForm}>
                    <input 
                        id={styles.loginInput}
                        type="text"
                        placeholder="Type your username"
                        name="user"
                        aria-label="Type your username"
                    />
                </form>
            </Box>
            <Box single area="info">
                <p>Info</p>
            </Box>
        </main>
    );
}

export default LoginForm