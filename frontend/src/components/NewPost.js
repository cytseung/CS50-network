import React from 'react'

const NewPost = () => {
    return (
        <>
        <h2>New Post</h2>
            <form>
                <p><textarea id="compose" type="text" autoFocus/></p>
                <p><button type="submit">Post</button></p>
            </form>
        </>
    )
}

export default NewPost
