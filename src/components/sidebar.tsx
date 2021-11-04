import React from 'react'
import Link from 'next/link'
import styles from '../../styles/components/sidebar.module.scss'

type Props = {
    user?: string
    image?: string
}


const UserSidebar: React.FC<Props> = (props) => {
    const github = `https://github.com/${props.user}`

    const links = [
        [`${github}?tab=repositories`, 'Go to user repository on GitHub', 'Repositories'],
        [`${github}?tab=stars`, 'Go to user stars on GitHub', 'Stars'],
    ]

    const getImage = () => {
        if ((props.user !== undefined) && (props.user !== '')) {
            return props.image
        }
        else {
            return '/images/user.jpg'
        }
    }
    return (
        <>
            <section className={styles.section}>
                <img src={getImage()} alt="user"/>
                <h3 className={styles.header}>
                    <Link passHref href={github}>
                        <a title="Go to user profile on GitHub" target="_blank">@{props.user}</a>
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