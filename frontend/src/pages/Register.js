import React from 'react'
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

import { initialState as registerInitialState, registerReducer } from '../register/reducer';
import { register } from '../register/actions';

import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import styles from './Login.module.css'
const Register = (props) => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirm, setConfirm] = React.useState('');

    const [state, dispatch] = React.useReducer(
        registerReducer,
        registerInitialState,
    );
    
    const handleRegister = async (e) => {
        e.preventDefault();
        if (password === confirm){
            let payload = { username: username, email: email, password: password };
            try{
                await register(dispatch, payload);
                props.history.push('login/')
            }catch(error){
                console.log(error);
            }
        }else{
            alert("Your password and confirmation password do not match.")
        }
    }
    return (
        <div>
            <Navbar />
            <h2>Register</h2>
            {state.isError ? (<p>Something went wrong...</p>):null}
            {state.isLoading ? (<p>Loading...</p>):null}
            <form action="" method="post">
                <div >
                    <TextField
                        autoFocus
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        variant="outlined"
                        className={styles.inputField}
                    />
                </div>
                <div >
                    <TextField
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        className={styles.inputField}
                    />
                </div>
                <div >
                    <TextField
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        className={styles.inputField}
                    />
                </div>
                <div >
                    <TextField
                        type="password"
                        name="confirmation"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirm(e.target.value)}
                        variant="outlined"
                        className={styles.inputField}
                    />
                </div>
                <Button type="submit" onClick={handleRegister} disabled={state.isLoading} variant="contained" color="primary" >Register</Button>
            </form>

            Already have an account? <Link to="login">Log In here.</Link>
        </div>
    )
}

export default Register
