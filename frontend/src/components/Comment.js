import React from 'react'

const Comment = ({text, username, createdOn}) => {
    const d = new Date(createdOn);
    return (
        <>
            <p>{text}</p>
            <p>{username}&nbsp;{d.toLocaleDateString()}&nbsp;{d.toLocaleTimeString()}</p>
        </>
    )
}

export default Comment
