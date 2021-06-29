import React from 'react'

import Post from './Post'

const mockdata = {
    count: 20,
    next: "http://127.0.0.1:8000/api/post/?format=json&page=2",
    previous: null,
    results: [
        {
            id: 27,
            text: "dmklkvlmtoe",
            createdOn: "2021-06-10T07:59:33.178055Z",
            updated: "2021-06-10T07:59:33.178081Z",
            user: "http://127.0.0.1:8000/api/user/2/?format=json",
            username: "user2",
            comments: [
                "http://127.0.0.1:8000/api/comment/8/?format=json"
            ],
            likedUsers: [],
            url: "http://127.0.0.1:8000/api/post/27/?format=json"
        },
        {
            id: 26,
            text: "fdsfmas ktgmkl;mrkgl;w",
            createdOn: "2021-06-10T07:59:29.871748Z",
            updated: "2021-06-10T07:59:29.871772Z",
            user: "http://127.0.0.1:8000/api/user/2/?format=json",
            username: "user2",
            comments: [],
            likedUsers: [],
            url: "http://127.0.0.1:8000/api/post/26/?format=json"
        },
        {
            id: 25,
            text: "12ml;r1",
            createdOn: "2021-06-10T07:59:21.954735Z",
            updated: "2021-06-10T07:59:21.954756Z",
            user: "http://127.0.0.1:8000/api/user/2/?format=json",
            username: "user2",
            comments: [
                "http://127.0.0.1:8000/api/comment/9/?format=json"
            ],
            likedUsers: [],
            url: "http://127.0.0.1:8000/api/post/25/?format=json"
        },
    ]
}
const Postlist = ({postlist}) => {
    return postlist.map(({ id, ...post }) => {
        return (

            <Post key={id} {...post} />

        );
    });
}


export default Postlist;
