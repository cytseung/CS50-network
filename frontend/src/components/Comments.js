import React from 'react'

const Comments = ({ comments }) => {
    return (
        comments.map(comment=>{
            return (<p>{comment}</p>);
        })

        
    )
}

export default Comments
