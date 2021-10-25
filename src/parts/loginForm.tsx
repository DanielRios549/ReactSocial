import React, { useState } from 'react'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import Box from '../components/box'
import styles from '../../styles/parts/login.module.scss'


const LoginForm: React.FC = () => {
    const router = useRouter()
    const [user, setUser] = useState('')

    const handleLogin = (event: any) => {
        event.preventDefault()

        fetch('https://alurakut.vercel.app/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                githubUser: user
            })
        })
        .then(async response => {
            const data = await response.json()
            const token = data.token

            nookies.set(null, 'token', token, {
                path: '/',
                maxAge: 86400,
            })

            router.push('/')
        })
    }
    return (
        <main id={styles.login}>
            <Box single area="image">
                <p>Test</p>
            </Box>
            <Box single area="form">
                <form onSubmit={handleLogin} id={styles.loginForm}>
                    <h3>Enter with your Github User</h3>
                    <input 
                        id={styles.loginInput}
                        type="text"
                        placeholder="Type your username"
                        name="user"
                        aria-label="Type your username"
                        value={user}
                        onChange={(event) => setUser(event.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </Box>
            <Box single area="info">
                <p>Info</p>
            </Box>
        </main>
    );
}

export default LoginForm