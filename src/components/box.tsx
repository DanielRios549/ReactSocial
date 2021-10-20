import React from 'react'
import styles from '../../styles/components/box.module.scss'

type Props = {
    single?: boolean
    area: string
    tag?: 'div' | 'aside' | 'article' | 'section'
}

const Box: React.FC<Props> = (props) => {
    var Tag: any = 'div'
    var type = props.single === true ? styles.single : styles.multi

    if (props.tag !== undefined) {
        Tag = props.tag
    }
    return (
        <Tag style={{gridArea: props.area}} className={type}>{
            props.children
        }
        </Tag>
    )
}

export default Box