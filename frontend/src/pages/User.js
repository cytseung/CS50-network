import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
    let { username } = useParams();
    console.log(username);
    return (
        <div>
            <h2>Profile Page</h2>
        </div>
    )
}

export default User
