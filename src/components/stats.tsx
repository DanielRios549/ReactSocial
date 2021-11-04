import React from 'react'
import styles from '../../styles/components/stats.module.scss'
import { useAuth } from '../hooks/useContext'

type Props = {
    user?: string
}


const Stats: React.FC<Props> = (props) => {
    const {user} = useAuth()
    const username = props.user !== undefined ? props.user : user.username

    const config = {
        url: 'https://github-readme-stats.vercel.app/api',
        user: `username=${username}`,
        title: 'GitHub Stats',
        theme: 'theme=react',
        background: 'bg_color=242526',
        border: 'hide_border=true',
        langs: 'langs_count=7',
        icons: 'show_icons=true',
        commits: 'include_all_commits=true'
    }

    const commonConfig = `${config.user}&${config.theme}&${config.border}&${config.background}`

    return (
        <section id={styles.stats} role="stats_frame">
            <img role="stats" alt="stats" src={`${config.url}?custom_title=${config.title}&${commonConfig}&${config.icons}&${config.commits}&hide_rank=true`} />
            <img role="stats" alt="langs" src={`${config.url}/top-langs/?${commonConfig}&${config.langs}&layout=compact`} />
        </section>
    )
}

export default Stats