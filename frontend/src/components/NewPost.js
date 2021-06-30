import React from 'react'
import Button from '@material-ui/core/Button'


const NewPost = () => {
    return (
        <>
            <h2>New Post</h2>
            <form >
                <p><textarea id="compose" type="text" autoFocus /></p>
                <p><Button type="submit" variant="contained" color="primary">Post</Button></p>
            </form>
        </>
    )
}

export default NewPost
