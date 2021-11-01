import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import Box from '../components/box'
import styles from '../../styles/parts/login.module.scss'


const LoginForm: React.FC = () => {
    const {signIn} = useAuth()
    const {register, handleSubmit} = useForm()

    const handleLogin = async (data: any) => {
        await signIn(data)
    }
    return (
        <main id={styles.login}>
            <Box single area="image">
                <p>Test</p>
            </Box>
            <Box single area="form">
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
            <Box single area="info">
                <p>Info</p>
            </Box>
        </main>
    );
}

export default LoginForm