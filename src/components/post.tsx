import React from 'react'
import Image from 'next/image'
import PostType from '../types/post'
import styles from '../../styles/components/post.module.scss'


const Post: React.FC<PostType> = (props) => {
    return (
        <article className={styles.post}>
            <header className={styles.header}>
                <Image width={30} height={30} src={`${props.image}&size=30`} alt="post-creator"/>
                <h3>@{props.user}</h3>
            </header>
            <section className={styles.text}>{
                props.text
            }</section>
        </article>
    )
}

export default Post