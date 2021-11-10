import React from 'react'
import Image from 'next/image'
import Relation from '../types/relation'
import styles from '../../styles/components/relations.module.scss'

type Props = {
    name: string
    items: Relation[]
}


const Relations: React.FC<Props> = (props) => {
    const itemsToShow = () => {
        const show = props.items.slice(0, 6)

        return show
    }
    return (
        <section className={styles.relation}>
            <h3 className={styles.header}>{`${props.name} (${props.items.length})`}</h3>
            <ul className={styles.items}>{
                itemsToShow().map((item, index) => (
                    <li key={index} className={styles.item}>
                        <figure className={styles.figure}>
                            <figcaption className={styles.caption}>{item.name}</figcaption>
                            <Image loading="lazy" width={100} height={100} src={item.image} alt={`${item.name} profile image`} />
                        </figure>
                    </li>
                ))
            }</ul>
        </section>
    );
}

export default Relations