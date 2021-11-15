import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import NavLink from '../components/navLink'
import { useTheme } from '../hooks/useContext'

import styles from '../../styles/parts/header.module.scss'
import LogoIcon from '../../public/images/reakut.svg'
import MenuIcon from '../../public/images/menu.svg'

type Props = {
    page: string
    noMenu?: boolean
    noSearch?: boolean
}


const Header: React.FC<Props> = (props) => {
    const [menu, setMenu] = useState(false)
    const {theme, ThemeIcon, handleTheme} = useTheme()

    const handleMenu = () => {
        menu === false ? setMenu(true) : setMenu(false)
    }

    return (
        <>
            <Head>
                <title>Reakut - {props.page}</title>
                <meta name="description" content="Social Network build with NextJS (Study purposes)" />
                <meta name="theme-color" content="#242526" />
                <link rel="apple-touch-icon" href="/images/icon-192x192.png" />
                <link rel="icon" href="/images/favicon.png" />
                <link rel="manifest" href="manifest.json" />
            </Head>
            <header id={styles.header}>
                <Link href="/">
                    <a id={styles.logo}>
                        <LogoIcon/>
                    </a>
                </Link>
                {props.noMenu !== true &&
                    <>
                        <button onClick={handleMenu} id={styles.menuToggle} aria-label="menuToggle">
                            < MenuIcon/>
                        </button>
                        <nav id={styles.menu} className={menu === true ? styles.active : styles.hide}>
                            <ul>
                                <li><NavLink href="/" activeClassName={styles.active}>Home</NavLink></li>
                                <li><NavLink href="/friends" activeClassName={styles.active}>Friends</NavLink></li>
                                <li><NavLink href="/communities" activeClassName={styles.active}>Communities</NavLink></li>
                                <li><Link href="/logout"><a>Logout</a></Link></li>
                            </ul>
                            <button onClick={handleTheme} id={styles.themeToggle} aria-label="themeToggle">
                                <ThemeIcon />
                                <span>Current Theme: {theme}</span>
                            </button>
                        </nav>
                    </>
                }
                {props.noSearch !== true &&
                    <input type="text" id={styles.search} placeholder="Search"/>
                }
            </header>
        </>
    )
}

export default dynamic(() => Promise.resolve(Header), {
    ssr: false
});