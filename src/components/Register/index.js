import { useRef, useState, useEffect } from "react";
import React from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles.css';
import { Link } from "react-router-dom";
import axios from "axios";

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;


function Register() {
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [userFocus, setUserFocus] = useState(false);


    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        // console.log(result);
        // console.log(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        // console.log(result);
        // console.log(password);
        setValidPwd(result);
        const match = password === matchPwd;
        setValidMatch(match);

    }, [password, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [email, password, matchPwd]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(email, password);
        try {
            const response = await axios.post("http://localhost:4000/register",
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // console.log(response.data);
            // console.log(response.accessToken); 
            // console.log(JSON.stringify(response));
            setSuccess(true);
            setEmail('');
            setPassword('');
            setMatchPwd('');
        } catch (error) {
            if (!error.response) {
                setErrMsg('No Server Response');
            } else if (error.response.status === 409) {
                setErrMsg('Email already in use');
            } else {
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    };
    return (
        <>
            { success ? (
                <section>
                    <h1>Success!</h1>
                    <Link to="/login">Login</Link>
                </section>
            ) : (
                <section className="registerSection">
                    <p ref={ errRef } className={ errMsg ? "errmsg" : "offscreen" } aria-live="assertive">{ errMsg }</p>
                    <h1 className="registerTitle">Register</h1>
                    <p className="regText">Welcome! Create an account</p>
                    <form className="registerForm" onSubmit={ handleSubmit }>

                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={ faCheck } className={ validEmail ? "valid" : "hide" } />
                            <FontAwesomeIcon icon={ faTimes } className={ validEmail || !email ? "hide" : "invalid" } />
                        </label>
                        <input
                            className="registerInput"
                            type="text"
                            id="email"
                            ref={ emailRef }
                            autoComplete="off"
                            onChange={ (e) => setEmail(e.target.value) }
                            value={ email }
                            required
                            onFocus={ () => setUserFocus(true) }
                            onBlur={ () => setUserFocus(false) }
                        />

                        <p id="uidnote" className={ userFocus && email && !validEmail ? "instructions" : "offscreen" }>
                            <FontAwesomeIcon icon={ faInfoCircle } />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>



                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={ faCheck } className={ validPwd ? "valid" : "hide" } />
                            <FontAwesomeIcon icon={ faTimes } className={ validPwd || !password ? "hide" : "invalid" } />
                        </label>
                        <input
                            className="registerPassword"
                            type="password"
                            id="password"
                            onChange={ (e) => setPassword(e.target.value) }
                            value={ password }
                            required
                            onFocus={ () => setPwdFocus(true) }
                            onBlur={ () => setPwdFocus(false) }
                        />
                        <p id="pwdnote" className={ pwdFocus && !validPwd ? "instructions" : "offscreen" }>
                            <FontAwesomeIcon icon={ faInfoCircle } />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: !@#%
                        </p>

                        <br />

                        <label htmlFor="confirm_pwd">
                            Repeat Password:
                            <FontAwesomeIcon icon={ faCheck } className={ validMatch && matchPwd ? "valid" : "hide" } />
                            <FontAwesomeIcon icon={ faTimes } className={ validMatch || !matchPwd ? "hide" : "invalid" } />
                        </label>
                        <input
                            className="registerPassword"
                            type="password"
                            id="confirm_pwd"
                            onChange={ (e) => setMatchPwd(e.target.value) }
                            value={ matchPwd }
                            required
                            onFocus={ () => setMatchFocus(true) }
                            onBlur={ () => setMatchFocus(false) }
                        />
                        <p id="confirmnote" className={ matchFocus && !validMatch ? "instructions" : "offscreen" }>
                            <FontAwesomeIcon icon={ faInfoCircle } />
                            Must match the first password input field.
                        </p>
                        <br />
                        <button className="registerButton" disabled={ !validEmail || !validPwd || !validMatch ? true : false }>Sign Up</button>
                    </form>

                    <div className="loginAccount">
                        <p> Already have an account?
                            <Link className="loginLink" to="/login">Login</Link>
                        </p>
                    </div>
                </section>
            ) }
        </>
    );
}

export default Register;