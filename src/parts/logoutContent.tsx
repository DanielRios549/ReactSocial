import React, { useEffect } from 'react'
import Box from '../components/box'
import styles from '../../styles/parts/mainContent.module.scss'
import { useAuth } from '../hooks/useContext'

const LogoutContent: React.FC = () => {
    const {signOut} = useAuth()

    useEffect(() => {
        setTimeout(() => {
            signOut()
        }, 2000)  // 2 seconds
    }, [])

    return (
        <main id={styles.main}>
            <Box single noBackground id={styles.logout} area='form' tag="section">
                <span id={styles.text}>Disconnecting</span>
            </Box>
        </main>
    )
}

export default LogoutContent