import React from 'react'
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
const Register = () => {
    return (
        <div>
            <Navbar />
            <h2>Register</h2>
            <form action="" method="post">
                <div >
                    <input autoFocus type="text" name="username" placeholder="Username" />
                </div>
                <div >
                    <input type="email" name="email" placeholder="Email Address" />
                </div>
                <div >
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <div >
                    <input c type="password" name="confirmation" placeholder="Confirm Password" />
                </div>
                <input type="submit" value="Register" />
            </form>

            Already have an account? <Link to="login">Log In here.</Link>
        </div>
    )
}

export default Register
