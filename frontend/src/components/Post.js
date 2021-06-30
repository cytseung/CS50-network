import React from 'react'

import Comments from './Comments';

const Post = ({ createdOn, text, username, comments }) => {
    const d = new Date(createdOn);
    return (
        <>
            <div>
                <h3>{text}</h3>
                {/* <button>Edit</button> */}
                <div>
                    <span>{d.toLocaleDateString()}</span>&nbsp;<span>{d.toLocaleTimeString()}</span>
                </div>
                <div>{username}</div>
                <Comments comments={comments}/>
                <div>
                <input type="checkbox"/>
                </div>
                <hr />
            </div>
        </>
    )
}

export default Post
