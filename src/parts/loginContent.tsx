import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useContext'
import Box from '../components/box'
import styles from '../../styles/parts/loginContent.module.scss'


const LoginContent: React.FC = () => {
    const {signIn} = useAuth()
    const {register, handleSubmit} = useForm()

    const handleLogin = async (data: any) => {
        await signIn(data)
    }
    return (
        <main id={styles.login}>
            <Box single area="image" tag="section">
                <Image src="/images/reakut.png" width={179} height={50}/>
                <h1>Show data from GitHub users</h1>
                <p>The data is fetched using GitHub API and saved to Storage</p>
                <p><strong>This is a study project</strong></p>
            </Box>
            <Box single area="form" tag="section">
                <form onSubmit={handleSubmit(handleLogin)} id={styles.loginForm}>
                    <h3>Enter with your Github User</h3>
                    <input 
                        {...register('username', { required: true })}
                        id={styles.loginInput}
                        type="text"
                        placeholder="Type your username"
                        name="username"
                        aria-label="Type your username"
                    />
                    <button type="submit">Login</button>
                </form>
            </Box>
            <Box single area="info" tag="section">
                <p>
                    <Link href="https://github.com/DanielRios549/ReactSocial">
                        <a target="_blank" rel="noreferrer">
                            Source Code on GitHub
                        </a>
                    </Link>
                </p>
            </Box>
        </main>
    );
}

export default LoginContent