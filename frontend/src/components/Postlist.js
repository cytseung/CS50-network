import React from 'react'

import Post from './Post'


const Postlist = ({postlist}) => {
    return postlist.map((post) => {
        return (

            <Post key={post.id} id={post.id} post={post} />

        );
    });
}

const PostlistMemo = React.memo(Postlist)

export default PostlistMemo;
