import React from 'react'

import Post from './Post'


const Postlist = ({postlist}) => {
    return postlist.map((post) => {
        // console.log(post)
        return (

            <Post key={post.id} id={post.id} post={post} />

        );
    });
}


export default Postlist;
