import React from 'react'
import Head from 'next/head'
import styles from '../../styles/parts/header.module.scss'

type Props = {
    page: string
    menu: boolean
}


const Header: React.FC<Props> = (props) => {
    const [menu, setMenu] = React.useState(false)

    const handleMenu = () => {
        menu === false ? setMenu(true) : setMenu(false)
    }

    return (
        <>
            <Head>
                <title>Reakut - {props.page}</title>
                <meta name="description" content="Social Network build with NextJS (Study purposes)" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header id={styles.header}>
                <img src="/vercel.svg" alt="logo" width={150} height={20} className={styles.logo}/>{
                    props.menu === true &&
                        <>
                            <button onClick={handleMenu} id={styles.menuToggle}/>
                            <nav id={styles.menu} className={menu === true ? styles.active : styles.hide}>
                                <ul>
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">Friends</a></li>
                                    <li><a href="#">Communities</a></li>
                                </ul>
                            </nav>
                        </>
                    }
                <input type="text" id={styles.search} placeholder="Search"/>
            </header>
        </>
    )
}

export default Header