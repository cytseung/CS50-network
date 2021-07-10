import React from 'react'
import axios from 'axios'
import { Link, withRouter } from "react-router-dom"

import { API_ROOT } from '../config/global';
import Commentlist from './Commentlist';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import { useAuthState } from '../auth/context';

const Post = ({ id, post, history }) => {
    const d = new Date(post.createdOn);
    const upd = new Date(post.updated)
    const userDetails = useAuthState();
    const [isLiked, setIsLiked] = React.useState(false);
    const [likedUsersNum, setlikedUsersNum] = React.useState(post.likedUsers.length)
    const [isEditing, setIsEditing] = React.useState(false);
    const [editText, setEditText] = React.useState(post.text)
    const [titleText, setTitleText] = React.useState(post.text)

    const toggleLike = async (like) => {
        try {
            let v = false;
            if (like) {
                v = "True";
            } else {
                v = "False";
            }

            const body = { like: v };
            const response = await axios.put(`${API_ROOT}post/${id}/toggle_like_post/`, body);
            return response
        } catch (e) {
            console.log(e)
        }
    }

    React.useEffect(() => {
        if (userDetails.user) {
            if (post.likedUsers.indexOf(userDetails.user.user_id) !== -1)
                setIsLiked(true)
        }
    }, [])

    const handleCheckbox = async (event) => {
        if (!userDetails.user) {
            alert("You are not logged in.")
            history.push("/login");
            return null;

        }
        try {
            const response = await toggleLike(event.target.checked);
            if (response.data.status === "liked post") {
                setlikedUsersNum(prev => prev + 1)
            } else if (response.data.status === "unliked post") {
                setlikedUsersNum(prev => prev - 1)
            } else {
                console.log("Uncaught error")
            }
            setIsLiked(!isLiked);
        } catch (e) {
            console.log(e);
        }
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    }

    const editPost = async () => {
        const payload = { text: editText }
        try {
            const response = await axios.put(`${API_ROOT}post/${id}/`, payload);
            if (response === undefined) throw new Error();
            // console.log(response)
            return response;
        } catch (error) {
            console.log(error)
        }

    }


    const handleEditSubmit = async (event) => {
        event.preventDefault();
        if (!userDetails.user) {
            alert("You are not logged in.")
            history.push("/login");
            return null;

        }
        try {
            const response = await editPost();
            if (response.status === 200) {
                setIsEditing(false);
                setTitleText(editText);
            }
            else {
                console.log("An error occurred")
            }

        } catch (e) {
            console.log(e);
        }

    }

    React.useEffect(() => {
        // console.log(isLiked)

    }, [isLiked])

    const created = <><span>{d.toLocaleDateString()}</span>&nbsp;<span>{d.toLocaleTimeString()}</span></>
    const updated = <><span>{upd.toLocaleDateString()}</span>&nbsp;<span>{upd.toLocaleTimeString()}</span></>


    return (
        <>
            <div>
                <span>
                    {isEditing
                        ? <form >
                            <p><textarea id="edit" type="text" autoFocus value={editText} onChange={(e) => setEditText(e.target.value)} /></p>
                            <p><button type="submit" variant="contained" color="primary" onClick={handleEditSubmit} disabled={!editText}>Submit</button></p>
                        </form>
                        : (<h3>{titleText}</h3>)}
                    {d.toLocaleTimeString() !== upd.toLocaleTimeString() || d.toLocaleDateString() !== upd.toLocaleDateString() ? <p>Last updated {updated}</p> : null}
                    {userDetails.user && userDetails.user.user_id === post.user_id
                        ? <button onClick={handleEdit}>Edit</button>
                        : null
                    }

                </span>
                <div>
                    {created}
                </div>
                <div><Link to="/login">{post.username}</Link></div>
                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                                name="checkedH"
                                checked={isLiked}
                                onChange={handleCheckbox}
                            />}
                        label={likedUsersNum}
                    />
                </div>
                <Commentlist comments={post.comments} />
                {/* {isLiked ? <p>liked</p> : <p>not liked</p>} */}

                <hr />
            </div>
        </>
    )
}
const PostwithRouter = withRouter(Post)
export default PostwithRouter
