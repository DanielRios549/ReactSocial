import React from 'react'
import Image from 'next/image'
import styles from '../../styles/parts/footer.module.scss'


const Footer: React.FC = () => {
    const vercelLink = 'https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
    const githubLink = 'https://github.com/DanielRios549'

    return (
        <footer className={styles.footer}>
            <span>
            Powered by
            <a href={vercelLink} target="_blank" rel="noreferrer" className={styles.vercel}>
                <Image loading="lazy" src="/images/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </a>
            </span>
            <span>
            Created by
            <a href={githubLink} rel="noreferrer" target="_blank">
                Daniel Rios
            </a>
            </span>
        </footer>
    );
}

export default Footer