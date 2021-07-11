import React from 'react'
import { Link } from 'react-router-dom'

const Comment = ({ text, username, createdOn }) => {
    const d = new Date(createdOn);
    return (
        <>
            <p>{text}</p>
            <p><Link to={`/user/${username}`}>{username}</Link>&nbsp;{d.toLocaleDateString()}&nbsp;{d.toLocaleTimeString()}</p>
        </>
    )
}

export default Comment
