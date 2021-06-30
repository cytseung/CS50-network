import React from 'react'

const Comments = ({ comments }) => {
    return (
        comments.map(comment => {
            const d = new Date(comment.createdOn);
            return (
                <>
                    <p>{comment.text}</p>
                    <p>{comment.username}&nbsp;{d.toLocaleDateString()}&nbsp;{d.toLocaleTimeString()}</p>
                </>
            );
        })
    )
}

export default Comments
