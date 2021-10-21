import React from 'react'
import Relation from '../types/relation'

type Props = {
    name: string
    items: Relation[]
}


const Relations: React.FC<Props> = (props) => {
    return (
        <section>
            <h2>{`${props.name} (${props.items.length})`}</h2>
            <ul>{
                props.items.map((item, index) => (
                    <li key={index}>{
                        item.name
                    }</li>
                ))
            }</ul>
        </section>
    );
}

export default Relations