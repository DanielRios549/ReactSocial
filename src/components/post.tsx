import React from 'react'
import styles from '../../styles/components/post.module.scss'

type Props = {
    creator: string | undefined
}


const Post: React.FC<Props> = (props) => {
    return (
        <article className={styles.post}>{
            props.creator
        }</article>
    )
}

export default Post