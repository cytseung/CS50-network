import React from 'react'
import axios from 'axios'
import { Link, withRouter } from "react-router-dom"

import { API_ROOT } from '../config/global';
import Commentlist from './Commentlist';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import { useAuthState, useAuthDispatch } from '../auth/context';

const Post = ({ id, post, history }) => {
    const d = new Date(post.createdOn);
    const userDetails = useAuthState();
    const [isLiked, setIsLiked] = React.useState(false);
    const [likedUsersNum, setlikedUsersNum] = React.useState(post.likedUsers.length)
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
        if (!userDetails.user){
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




    React.useEffect(() => {
        // console.log(isLiked)

    }, [isLiked])



    return (
        <>
            <div>
                <h3>{post.text}</h3>
                <div>
                    <span>{d.toLocaleDateString()}</span>&nbsp;<span>{d.toLocaleTimeString()}</span>
                </div>
                <div>{post.username}</div>
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
