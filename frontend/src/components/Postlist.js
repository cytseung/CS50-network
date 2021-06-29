import React from 'react'

import Post from './Post'


const Postlist = ({postlist}) => {
    return postlist.map(({ id, ...post }) => {
        return (

            <Post key={id} {...post} />

        );
    });
}


export default Postlist;
