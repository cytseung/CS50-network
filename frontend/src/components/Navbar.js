import React from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div>
            <nav>
                <Link to="">Network</Link>

                <div>
                    <ul>
                        <li>
                            <Link to="">All Posts</Link>
                        </li>
                        <li>
                            <Link to="login">Log In</Link>
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

export default Navbar
