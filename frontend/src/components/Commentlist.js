import React from 'react'

import Comment from './Comment'

const Commentlist = ({ comments }) => {
    console.log(comments)
    return comments.map(({ id, ...comment }) => {
        return (

            <Comment key={id} {...comment} />

        );
    });
}

export default Commentlist
