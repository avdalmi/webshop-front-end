import React from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './context/index';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import './styles.css';

const LOGIN_URL = '/login';

function Login() {
    const { setAuth } = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMsg('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // console.log(JSON.stringify(response.data));
            const accessToken = response.data.accessToken;
            setAuth({ email, password, accessToken });

            setEmail("");
            setPassword("");
            setSuccess(true);

        } catch (err) {
            if (!err?.response) {
                setErrorMsg("No server response");
            } else if (err.response?.status === 400) {
                setErrorMsg("Missing email or password");
            } else if (err.response?.status === 401) {
                setErrorMsg("Unauthorized");
            } else {
                setErrorMsg("login failed");
            }
            errRef.current.focus();
        }

    };

    return (
        <>
            { success ? (
                <section>
                    <h1>You are logged in</h1>
                    <br />
                    <Link to="/shop">
                        <button>Back to Home</button>
                    </Link>

                </section>
            ) : (
                <section className="loginSection">
                    {/* displays error message */ }
                    <p ref={ errRef } className={ errMsg ? "errmsg" : "offscreen" } aria-live="assertive">{ errMsg }</p>
                    <h1 className="logHeader logtitle">Log in</h1>
                    <p className='logText logtitle'>Please login using account details below.</p>

                    <form onSubmit={ handleSubmit }>
                        <div className='inputEmail'>
                            <label htmlFor="email">E-mail Address</label>
                            <input
                                type="text"
                                id="email"
                                ref={ userRef }
                                autoComplete="off"
                                onChange={ (e) => setEmail(e.target.value) }
                                value={ email }
                                required
                            />
                        </div>

                        <div className='inputPwd'>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                onChange={ (e) => setPassword(e.target.value) }
                                value={ password }
                                required
                            />
                        </div>
                        <p className='forgotPwd'>Forgot your password?</p>
                        <button className='signInBtn'>Sign In</button>

                        <div className='newAccount'>
                            <p>Don't have an Account?
                                <Link className="accountLink" to="/register">Create Account</Link>
                            </p>
                        </div>
                    </form>
                </section>
            ) }
        </>
    );
}

export default Login;