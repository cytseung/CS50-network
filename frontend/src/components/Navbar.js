import React from 'react'
import axios from 'axios'
import { Link, withRouter } from "react-router-dom"
import { logout } from '../auth/actions';
import { useAuthState, useAuthDispatch } from '../auth/context';
import Button from '@material-ui/core/Button';

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
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="">Network</Link>

                <div>
                    <ul className="navbar-nav mr-auto">
                        {userDetails.user ?
                            <li className="nav-item">
                                <Link className="nav-link" to={`/user/${userDetails.user.user_name}`}>{userDetails.user.user_name}</Link>
                            </li>
                            : null}
                        <li className="nav-item">
                            <Link className="nav-link" to="/">All Posts</Link>
                        </li>
                        {userDetails.user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/following">Following</Link>
                                </li>
                                <li className="nav-item">
                                    <Button className="nav-link" onClick={handleLogout}>Log Out</Button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Log In</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    )
}
const NavbarwithRouter = withRouter(Navbar)

export default NavbarwithRouter
