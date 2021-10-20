import React from 'react'
import styles from '../../styles/parts/header.module.scss'


const Header: React.FC = () => {
    const [menu, setMenu] = React.useState(false)

    const handleMenu = () => {
        menu === false ? setMenu(true) : setMenu(false)
    }

    return (
        <header id={styles.header}>
            <img src="/vercel.svg" alt="logo" width={150} height={20} className={styles.logo}/>
            <button onClick={handleMenu} id={styles.menuToggle} />
            <nav id={styles.menu} className={menu === true ? styles.active : styles.hide}>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Friends</a></li>
                    <li><a href="#">Communities</a></li>
                </ul>
            </nav>
            <input type="text" id={styles.search} placeholder="Search"/>
        </header>
    )
}

export default Header