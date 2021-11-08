import React from 'react'
import Footer from '../src/parts/footer'
import Header from '../src/parts/header'
import LogoutContent from '../src/parts/logoutContent'
import styles from '../styles/pages.module.scss'

const Logout: React.FC = () => {
  return (
    <div id={styles.container}>
        <Header noMenu noSearch page="logout"/>
        <LogoutContent />
        <Footer />
    </div>
  )
}

export default Logout