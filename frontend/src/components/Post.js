import React from 'react'

import Commentlist from './Commentlist';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

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
                <div>
                    <FormControlLabel
                        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                    />
                </div>
                <Commentlist comments={comments} />
                <hr />
            </div>
        </>
    )
}

export default Post
