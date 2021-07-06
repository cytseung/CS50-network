import React from 'react'
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { loginUser } from '../auth/actions';
import { useAuthState, useAuthDispatch } from '../auth/context';

const Login = (props) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const dispatch = useAuthDispatch();
    const { loading, errorMessages } = useAuthState();

    const handleLogin = async (e) => {
        e.preventDefault()
        let payload = { username: username, password: password };
        try {
            let response = await loginUser(dispatch, payload);
            // console.log(response)
            if (response === undefined) throw new Error();
            if (!response.user_id) return
            props.history.push('/')
        } catch (error) {
            // console.log(error);
        }
    }
    return (
        <div>
            <Navbar />
            <h2>Login</h2>
            {errorMessages.length !== 0 && errorMessages.map(errorMessage => { return (<p> {errorMessage} </p>) })}
            <form action="" method="post">
                <div>
                    <input
                        autoFocus
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </div>
                <div>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <div>
                    <input
                        type="submit"
                        value="Login"
                        onClick={handleLogin}
                        disabled={loading}
                    />
                </div>
            </form>
            Don't have an account? <Link to="register">Register here.</Link>
        </div>
    )
}

export default Login
