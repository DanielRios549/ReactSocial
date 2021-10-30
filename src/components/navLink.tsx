import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
    href: string
    activeClassName: string
}

const NavLink: React.FC<Props> = (props) => {
    const router = useRouter()

    return (
        <Link passHref href={props.href}>
            <a className={router.pathname === props.href ? props.activeClassName : ''}>{props.children}</a>
        </Link>
    
);
}

export default NavLink