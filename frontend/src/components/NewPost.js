import React from 'react'

import Button from '@material-ui/core/Button'
import useStyles from '../material_UI/BasicTextFieldStyle'
import { TextField } from '@material-ui/core'

const NewPost = ({ onPost, onInput, text }) => {
    const classes = useStyles();
    // const [text, setText] = React.useState("");
    // console.log(text)

    // const handlePost = async (e) => {
    //     e.preventDefault();
    //     const payload = { text: text };
    //     try {
    //         const response = await axios.post(`${API_ROOT}post/`, payload);
    //         if (response === undefined) throw new Error();
    //         console.log(response)

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    return (
        <>
            <h2>New Post</h2>
            <form >
                <p><TextField className={classes.root} variant="filled"  id="compose" type="text" autoFocus onChange={onInput} value={text}/></p>
                <p><Button type="submit" variant="contained" color="primary" onClick={onPost} disabled={!text}>Post</Button></p>
            </form>
        </>
    )
}

export default NewPost
