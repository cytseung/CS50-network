import React from 'react'
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
const Login = () => {
    return (
        <div>
            <Navbar />
            <h2>Login</h2>
            <form action="" method="post">
                <div>
                    <input autoFocus type="text" name="username" placeholder="Username" />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <div>
                    <input class="btn btn-primary" type="submit" value="Login" />
                </div>
            </form>
            Don't have an account? <Link to="register">Register here.</Link>
        </div>
    )
}

export default Login
