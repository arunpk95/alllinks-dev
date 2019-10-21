
import React, { useState, useEffect } from "react"
import axios from 'axios';
import LoadingIcon from '../helpers/loadingicon';
import {endpoints} from '../helpers/services/apiHelper'

export default function signupForm() {
    const [userEmail, setUserEmail] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");
    const [userConfirmPassword, setUserConfirmPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [validationErrors, setValidationErros] = React.useState("{}");
    const [registered, setRegistered] = React.useState(false);



    const authHandler = async () => {
        try {
            setLoading(true);
            axios.post(endpoints.signup,
                { email: userEmail, name: userName, password: userPassword, c_password: userConfirmPassword })
                .then(res => {
                    setLoading(false);
                    setValidationErros({});
                    if (res.data.success.email == userEmail) {
                        setRegistered(true);
                    }
                    return res;
                })
                .catch(function (error) {
                    setLoading(false);
                    setRegistered(false);
                    //console.log(error);
                    if (error.response.status == 401) {
                        setValidationErros(error.response.data.error);
                    }
                });;
        } catch (err) {
            setLoading(false);
            setRegistered(false);
            console.log(err);
        }
    };

    const redirectLogin = (event) => {
        console.log("Sign in");
        window.location.href = "http://127.0.0.1:8000/login"
    };



    return (
        <div className="container is-fluid" id="content">

            <div>
                <section data-section-id="1" data-component-id="15a7_12_02_awz" data-category="sign-in" className="section">
                    <div className="container has-text-centered">
                        <div>
                            <img src="http://127.0.0.1:8000/images/icon.png"></img>
                        </div>
                        <div className="columns is-centered">
                            <div className="column is-5 is-4-desktop">
                                <form >
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="email" placeholder="Email" disabled={loading} value={userEmail} onChange={e => setUserEmail(e.target.value)} />
                                            <span className="help is-danger" >{validationErrors.email}</span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="text" placeholder="Name" disabled={loading} value={userName} onChange={e => setUserName(e.target.value)} />
                                            <span className="help is-danger" >{validationErrors.name}</span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="password" placeholder="Password" disabled={loading} value={userPassword} onChange={e => setUserPassword(e.target.value)} />
                                            <span className="help is-danger" >{validationErrors.password}</span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="password" placeholder="Confirm Password" disabled={loading} value={userConfirmPassword} onChange={e => setUserConfirmPassword(e.target.value)} />
                                            <span className="help is-danger" >{validationErrors.c_password}</span>
                                        </div>
                                    </div>
                                    {registered ? <div className="field">
                                        <b className="help is-danger" >Please Login to Continue</b></div> : null}

                                    <div className="field is-grouped">
                                        <div className="control is-expanded">
                                            <button className="button is-primary is-outlined is-fullwidth" data-config-id="secondary-action" type="button"
                                                onClick={
                                                    e => {
                                                        redirectLogin();
                                                    }
                                                }>Sign In!</button>
                                        </div>
                                        <div className="control is-expanded">
                                            <button className="button is-primary is-fullwidth" data-config-id="primary-action" disabled={loading}
                                            onClick={e => {
                                                e.preventDefault();
                                                authHandler();
                                            }}
                                            >Sign Up!</button>
                                        </div>
                                    </div>
                                    {loading ? (
                                        <LoadingIcon />
                                    ) : null}
                                    <p data-config-id="terms">By signing in you agree with the <a href="">Terms and Conditions</a> and <a href="">Privacy Policy</a>.</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    );


}
