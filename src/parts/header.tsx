import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import NavLink from '../components/navLink'
import styles from '../../styles/parts/header.module.scss'

type Props = {
    page: string
    noMenu?: boolean
    noSearch?: boolean
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
                <meta name="theme-color" content="#242526" />
                <link rel="apple-touch-icon" href="/images/icon-192x192.png"></link>
                <link rel="icon" href="/images/favicon.png" />
                <link rel="manifest" href="manifest.json" />
            </Head>
            <header id={styles.header}>
                <Link href="/">
                    <a id={styles.logo}>
                        <img width={150} height={40} src="/images/reakut.png" alt="logo"/>
                    </a>
                </Link>
                {props.noMenu !== true &&
                    <>
                        <button onClick={handleMenu} id={styles.menuToggle} aria-label="menuToggle"/>
                        <nav id={styles.menu} className={menu === true ? styles.active : styles.hide}>
                            <ul>
                                <li><NavLink href="/" activeClassName={styles.active}>Home</NavLink></li>
                                <li><NavLink href="/friends" activeClassName={styles.active}>Friends</NavLink></li>
                                <li><NavLink href="/communities" activeClassName={styles.active}>Communities</NavLink></li>
                                <li><Link href="/logout"><a>Logout</a></Link></li>
                            </ul>
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

export default Header