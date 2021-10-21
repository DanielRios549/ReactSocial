import React from 'react'

type Props = {
    user?: string
}


const UserSidebar: React.FC<Props> = (props) => {
    const link = 'https://github.com'

    const getImage = () => {
        return props.user !== undefined ? `${link}/${props.user}.png` : '/user.jpg'
    }
    return (
        <>
            <img src={getImage()} alt="user" />
            <hr />
        </>
    )
}

export default UserSidebar