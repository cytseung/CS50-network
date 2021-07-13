import React from 'react'
import Navbar from '../components/Navbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { loginUser } from '../auth/actions';
import { useAuthState, useAuthDispatch } from '../auth/context';
import { TextField } from '@material-ui/core';
import styles from './Login.module.css'

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
            if (response === undefined) throw new Error();
            if (!response.user_id) return
            props.history.push('/')
        } catch (error) {
        }
    }
    return (
        <div>
            <Navbar />
            <h2>Login</h2>
            {errorMessages.length !== 0 && errorMessages.map(errorMessage => { return (<p> {errorMessage} </p>) })}
            <form action="" method="post" className={styles.loginForm}>
                <div>
                    <TextField
                        autoFocus
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        variant="outlined"
                        placeholder="Username"
                        className={styles.inputField}
                    />
                </div>
                <div>
                    <TextField
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        placeholder="Password"
                        className={styles.inputField}
                    />
                </div>
                <div>
                    <Button
                        type="submit"
                        value="Login"
                        onClick={handleLogin}
                        disabled={loading}
                        color="primary"
                        variant="contained"
                        className={styles.loginButton}
                    >Login</Button>
                </div>
            </form>
            Don't have an account? <Link to="register">Register here.</Link>
        </div>
    )
}

export default Login
