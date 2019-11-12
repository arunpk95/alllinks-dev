
import React, {useState, useEffect} from "react"
import axios from 'axios';
import {endpoints} from '../helpers/services/apiHelper'
import AuthStore from '../helpers/stores/authStore'
import Settings from '../helpers/settings'

export default function loginForm() {
    const [userEmail, setUserEmail] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [validationErrors, setValidationErros] = React.useState("{}");
    const [loggedin, setLoggedin] = React.useState(false);

    
    const [settings] = React.useState(new Settings)

    const authHandler = async () => {
        try {
            setLoading(true);
            axios.post(endpoints.login,
                { email: userEmail, password: userPassword})
                .then(res => {
                    
                    setLoading(false);
                    setValidationErros({});
                    if (res.data.success.user.email == userEmail) {
                        setLoggedin(true);
                        AuthStore.setAuth('Bearer '+res.data.success.token, new Date().getDate()+1);
                        AuthStore.setProfile(res.data.success.user); 
                        window.location.href="/admin";
                    }
                    return res;
                })
                .catch(function (error) {
                    setLoading(false);
                    setLoggedin(false);
                    //console.log(error)
                    if (error.response.status == 401) {
                        setValidationErros(error.response.data);
                        setUserPassword("");
                       
                    }
                });;
        } catch (err) {
            setLoading(false);
            setLoggedin(false);
        }
    };

    const redirectSignup = (event) => {
        window.location.href = settings.signupRedirect;
    };
    
    return (
        <div className="container is-fluid" id="content">

        <div>
            <section data-section-id="1" data-component-id="15a7_12_02_awz" data-category="sign-in" className="section">
                <div className="container has-text-centered">
                    <div>
                        <img src={settings.homeURL+"images/icon.png"}/>
                    </div>

                    <div className="columns is-centered">
                        <div className="column is-5 is-4-desktop">
                            <form>
                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="email" placeholder="Email"  disabled={loading} value={userEmail} onChange={e => setUserEmail(e.target.value)} />
                                        <span className="help is-danger" >{validationErrors.email}</span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="password" placeholder="Password" disabled={loading} value={userPassword} onChange={e => setUserPassword(e.target.value)}/>
                                        <span className="help is-danger" >{validationErrors.password}</span>
                                        <span className="help is-danger" >{validationErrors.error}</span>
                                    </div>
                                </div>
                                <div className="field is-grouped">
                                        <div className="control is-expanded">
                                            <button className="button is-primary is-outlined is-fullwidth" data-config-id="secondary-action" type="button"
                                                onClick={
                                                    e => {
                                                        redirectSignup();
                                                    }
                                                }>Sign UP!</button>
                                        </div>
                                        <div className="control is-expanded">
                                            <button className={loading?"button is-primary is-fullwidth is-loading":"button is-primary is-fullwidth"} data-config-id="primary-action" disabled={loading}
                                            onClick={e => {
                                                e.preventDefault();
                                                authHandler();
                                            }}
                                            >Sign In!</button>
                                        </div>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>


                                );


                            }
                            