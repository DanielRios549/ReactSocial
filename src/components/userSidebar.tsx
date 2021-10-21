import React from 'react'

type Props = {
    user?: string
}


const UserSidebar: React.FC<Props> = (props) => {
    const link = 'https://github.com'

    const getImage = () => {
        if ((props.user !== undefined) && (props.user !== '')) {
            return `${link}/${props.user}.png`
        }
        else {
            return '/user.jpg'
        }
    }
    return (
        <>
            <img src={getImage()} alt="user" />
            <hr />
        </>
    )
}

export default UserSidebar