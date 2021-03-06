import React from 'react'
import styles from '../../styles/components/box.module.scss'

type Props = {
    single?: boolean
    area: string
    noBackground?: boolean
    id?: string
    hide?: boolean
    tag?: 'div' | 'aside' | 'article' | 'section'
}

const Box: React.FC<Props> = (props) => {
    var Tag: any = 'div'

    if (props.noBackground === true) {
        var type = 'none'
    }
    else {
        var type = props.single === true ? styles.single : styles.multi
    }

    if (props.tag !== undefined) {
        Tag = props.tag
    }
    return (
        <Tag style={{gridArea: props.area}} id={props.id} className={`${type} ${props.hide ? styles.hide : ''}`}>{
            props.children
        }
        </Tag>
    )
}

export default Box