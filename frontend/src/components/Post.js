import React from 'react'

const ConvertDate = (date) => {

}

const Post = ({ createdOn, text, username }) => {
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
                <hr />
            </div>
        </>
    )
}

export default Post
