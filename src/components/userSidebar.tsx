import React from 'react'

type Props = {
    user?: string
    image?: string
}


const UserSidebar: React.FC<Props> = (props) => {
    const getImage = () => {
        if ((props.user !== undefined) && (props.user !== '')) {
            return props.image
        }
        else {
            return '/images/user.jpg'
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