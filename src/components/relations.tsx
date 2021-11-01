import React from 'react'
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
            <h2>{`${props.name} (${props.items.length})`}</h2>
            <ul className={styles.items}>{
                itemsToShow().map((item, index) => (
                    <li key={index} className={styles.item}>
                        <figure className={styles.figure}>
                            <figcaption className={styles.caption}>{item.name}</figcaption>
                            <img src={item.image} alt={`${item.name} image`} />
                        </figure>
                    </li>
                ))
            }</ul>
        </section>
    );
}

export default Relations