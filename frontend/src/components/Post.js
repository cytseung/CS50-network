import React from 'react'
import axios from 'axios'
import { Link, withRouter } from "react-router-dom"

import { API_ROOT } from '../config/global';
import Commentlist from './Commentlist';
import NewComment from './NewComment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import { useAuthState } from '../auth/context';

const Post = ({ id, post, history }) => {
    // console.log("Post rendered")
    const d = new Date(post.createdOn);
    const upd = new Date(post.updated)
    const userDetails = useAuthState();

    const [isLiked, setIsLiked] = React.useState(false);
    const [likedUsersNum, setlikedUsersNum] = React.useState(post.likedUsers.length)

    const [isEditing, setIsEditing] = React.useState(false);
    const [editText, setEditText] = React.useState(post.text)
    const [titleText, setTitleText] = React.useState(post.text)

    const [newComment, setNewComment] = React.useState("");
    const [newCommentSubmit, setNewCommentSubmit] = React.useState(newComment);
    const [comments, setComments] = React.useState(post.comments)

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

    // React.useEffect(() => {
    //     // console.log(isLiked)

    // }, [isLiked])

    const postComment = async () => {
        const payload = { text: newCommentSubmit, post: id }
        try {
            const response = await axios.post(`${API_ROOT}comment/`, payload);
            // console.log(response.data)
            if (response === undefined) throw new Error();
            // console.log(response)
            return response;
        } catch (error) {
            console.log(error)
        }
    }
    const handleCommentInput = (event) => {
        // console.log("handleCommentInput called")
        setNewComment(event.target.value);
    }

    // const handleComment = async (event) => {
    //     event.preventDefault();
    //     if (newComment === "")
    //         return;
    //     if (!userDetails.user) {
    //         alert("You are not logged in.")
    //         history.push("/login");
    //         return;

    //     }
    //     try {
    //         const response = await postComment();
    //         if (response.status === 201) {
    //             setNewCommentSubmit(newComment);
    //             setNewComment("");

    //         }
    //         else {
    //             console.log("An error occurred")
    //         }

    //     } catch (e) {
    //         console.log(e);

    //     }
    // }
    const handleComment = (event) => {
        // console.log("handleComment called")
        event.preventDefault();
        setNewCommentSubmit(newComment);
    }

    const handleCommentSubmit = React.useCallback(async (event) => {
        // console.log("handleCommentSubmit called")
        if (newCommentSubmit === "")
            return;
        if (!userDetails.user) {
            alert("You are not logged in.")
            history.push("/login");
            return;

        }
        try {
            // console.log(newCommentSubmit)
            const response = await postComment();
            if (response.status === 201) {
                setNewComment("");
                return response;
            }
            else {
                console.log("An error occurred")
            }

        } catch (e) {
            console.log(e);

        }
    }, [newCommentSubmit])


    React.useEffect(async () => {
        // console.log("useEffect called")
        const response = await handleCommentSubmit();
        if (newCommentSubmit === "")
            return
        // console.log(newCommentSubmit)
        if (userDetails.user && response) {
            const c = {
                text: newCommentSubmit,
                username: userDetails.user.user_name,
                // createdOn: new Date().toLocaleString()
                createdOn: response.data.createdOn
            }
            // console.log(c)
            setComments([...comments, c])
        }
    }
        , [handleCommentSubmit])

    const created = <><span>{d.toLocaleDateString()}</span>&nbsp;<span>{d.toLocaleTimeString()}</span></>
    const updated = <><span>{upd.toLocaleDateString()}</span>&nbsp;<span>{upd.toLocaleTimeString()}</span></>

    let editButton = null;
    if (userDetails.user && userDetails.user.user_id === post.user_id) {
        if (isEditing) {
            editButton = <><button onClick={handleEdit}>Cancel</button></>
        } else {
            editButton = <><button onClick={handleEdit}>Edit</button></>
        }
    }

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
                    {/* {userDetails.user && userDetails.user.user_id === post.user_id
                        ? <button onClick={handleEdit}>Edit</button>
                        : null
                    } */}
                    {editButton}


                </span>
                <div>
                    {created}
                </div>
                <div><Link to={`/user/${post.username}`}>{post.username}</Link></div>
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
                <Commentlist comments={comments} />
                {userDetails.user ? <NewComment post_id={id} onInput={handleCommentInput} newComment={newComment} onComment={handleComment} /> : null}
                {/* {isLiked ? <p>liked</p> : <p>not liked</p>} */}

                <hr />
            </div>
        </>
    )
}
const PostwithRouter = withRouter(Post)
export default PostwithRouter
