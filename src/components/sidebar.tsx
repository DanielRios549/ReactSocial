import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../hooks/useContext'
import styles from '../../styles/components/sidebar.module.scss'

type Props = {
    user?: string
    image?: string
}


const UserSidebar: React.FC<Props> = (props) => {
    const {user} = useAuth()

    const username = props.user !== undefined ? props.user : user.username
    const image = props.image !== undefined ? props.image : user.image
    const link = `https://github.com/${username}`

    const links = [
        [`${link}?tab=repositories`, 'Go to user repository on GitHub', 'Repositories'],
        [`${link}?tab=stars`, 'Go to user stars on GitHub', 'Stars'],
    ]

    return (
        <>
            <section className={styles.section}>
                <Image src={image} alt="user" width={200} height={220}/>
                <h3 className={styles.header}>
                    <Link passHref href={link}>
                        <a title="Go to user profile on GitHub" target="_blank">@{username}</a>
                    </Link>
                </h3>
            </section>
            <section className={styles.section}>{
                links.map((item, index) => (
                    <Link key={index} passHref href={item[0]}>
                        <a title={item[1]} target="_blank">{item[2]}</a>
                    </Link>
                ))
            }</section>
        </>
    )
}

export default UserSidebar