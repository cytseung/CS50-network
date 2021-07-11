import React from 'react'

import Post from './Post'


const Postlist = ({postlist}) => {
    console.log("Post List rendered")
    return postlist.map((post) => {
        // console.log(post)
        return (

            <Post key={post.id} id={post.id} post={post} />

        );
    });
}

const PostlistMemo = React.memo(Postlist)

export default PostlistMemo;
