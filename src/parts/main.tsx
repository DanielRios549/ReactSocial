import React from 'react'
import Box from '../components/box'
import UserSidebar from '../components/userSidebar'
import styles from '../../styles/parts/main.module.scss'


const Main: React.FC = () => {
    const user = 'danielrios549'

    return (
        <main id={styles.main}>
            <Box single area="panel" tag="aside">
                <UserSidebar />
            </Box>
            <Box single area="wellcome" tag="article">
                <div>Wellcome!</div>
            </Box>
            <Box single area="form" tag="article">
                <div>Selection</div>
                <div>Form</div>
            </Box>
            <Box area="posts" tag="article">
                <div>Post 1</div>
                <div>Post 2</div>
            </Box>
            <Box area="aside" tag="aside">
                <div>Communities</div>
                <div>Friends</div>
            </Box>
        </main>
    )
}

export default Main