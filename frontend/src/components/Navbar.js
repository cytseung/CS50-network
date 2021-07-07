import React from 'react'
import axios from 'axios'
import { Link, withRouter, Redirect } from "react-router-dom"
import { logout } from '../auth/actions';
import { useAuthState, useAuthDispatch } from '../auth/context';

const Navbar = (props) => {
    const dispatch = useAuthDispatch();
    const userDetails = useAuthState();
    if (userDetails.token) {
        // console.log(userDetails.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails.token}`;
    } else {
        // console.log(456)
        delete axios.defaults.headers.common["Authorization"];
    }
    const handleLogout = async () => {
        try {
            await logout(dispatch);
            // console.log(props)
            // return (<Redirect to='/login' />)
            props.history.push('/login');
        } catch (e) {
            console.log(e);
        }
    }
    // console.log(userDetails)

    return (
        <div>
            <nav>
                <Link to="">Network</Link>

                <div>
                    <ul>
                        {userDetails.user ?
                            <li>
                                <p>{userDetails.user.user_name}</p>
                            </li>
                            : null}
                        <li>
                            <Link to="">All Posts</Link>
                        </li>
                        <li>
                            <Link to="login">Log In</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Log Out</button>
                        </li>
                        <li >
                            <Link to="register">Register</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
const NavbarwithRouter = withRouter(Navbar)

export default NavbarwithRouter
