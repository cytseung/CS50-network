import React from 'react';
import { withRouter } from 'react-router';

const NewComment = ({ history, post_id, onInput, onComment, newComment}) => {
    // const userDetails = useAuthState();
    // const [comment, setComment] = React.useState("");
    // console.log(comment)
    // const postComment = async () => {
    //     const payload = { text: comment, post: post_id }
    //     try {
    //         const response = await axios.post(`${API_ROOT}comment/`, payload);
    //         if (response === undefined) throw new Error();
    //         console.log(response)
    //         return response;
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const handleComment = async (event) => {
    //     event.preventDefault();
    //     if (!userDetails.user) {
    //         alert("You are not logged in.")
    //         history.push("/login");
    //         return null;

    //     }
    //     try {
    //         const response = await postComment();
    //         if (response.status === 201) {
    //             setComment("")
    //         }
    //         else {
    //             console.log("An error occurred")
    //         }

    //     } catch (e) {
    //         console.log(e);

    //     }
    // }
    return (
        <div>
            <form >
                <input type="text" value={newComment} placeholder="Leave a comment" onChange={onInput} />
                <input type="submit" onClick={onComment} hidden />

            </form>
        </div>
    )
}

const NewCommentwithRouter = withRouter(NewComment);
export default NewCommentwithRouter
