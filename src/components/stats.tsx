import React from 'react'
import styles from '../../styles/components/stats.module.scss'
import { useAuth } from '../hooks/useContext'

type Props = {
    user?: string
    name?: string
}


const Stats: React.FC<Props> = (props) => {
    const {user} = useAuth()
    const name = props.name ? `${props.name}'s ` : ''
    const username = props.user || user.username

    const config = {
        url: 'https://github-readme-stats.vercel.app/api',
        user: `username=${username}`,
        title: `${name}GitHub Stats`,
        theme: 'theme=react',
        background: 'bg_color=242526',
        border: 'hide_border=true',
        langs: 'langs_count=7',
        icons: 'show_icons=true',
        commits: 'include_all_commits=true'
    }

    const commonConfig = `${config.user}&${config.theme}&${config.border}&${config.background}`

    return (
        <section id={styles.stats}>
            <img width={222} height={160} alt={`${username}'s stats`} src={`${config.url}?custom_title=${config.title}&${commonConfig}&${config.icons}&${config.commits}&hide_rank=true`} />
            <img width={295} height={160} alt={`${username}'s languages`} src={`${config.url}/top-langs/?${commonConfig}&${config.langs}&layout=compact`} />
        </section>
    )
}

export default Stats