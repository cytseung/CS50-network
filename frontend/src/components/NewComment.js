import React from 'react';
import { withRouter } from 'react-router';

const NewComment = ({ history, post_id, onInput, onComment, newComment}) => {
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
