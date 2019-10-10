

import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component {
    render() {
        return (
            <div className="container is-fluid" id="content">

                <div>
                    <section data-section-id="1" data-component-id="15a7_12_02_awz" data-category="sign-in" className="section">
                        <div className="container has-text-centered">
                            <div>
                                <img src="{{ asset('/images/icon.png') }}"></img>
                    </div>
                                <div className="columns is-centered">
                                    <div className="column is-5 is-4-desktop">
                                        <form>
                                            <div className="field">
                                                <div className="control">
                                                    <input className="input" type="email" placeholder="Email"/>
                                    </div>
                                                </div>
                                                <div className="field">
                                                    <div className="control">
                                                        <input className="input" type="text" placeholder="Name"/>
                                    </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="control">
                                                            <input className="input" type="password" placeholder="Password"/>
                                    </div>
                                                        </div>
                                                        <div className="field">
                                                            <div className="control">
                                                                <input className="input" type="password" placeholder="Confirm Password"/>
                                    </div>
                                                            </div>
                                                            <div className="field is-grouped">
                                                                <div className="control is-expanded">
                                                                    <button className="button is-primary is-outlined is-fullwidth" data-config-id="secondary-action">Sign In!</button>
                                                                </div>
                                                                <div className="control is-expanded">
                                                                    <button className="button is-primary is-fullwidth" data-config-id="primary-action">Sign up!</button>
                                                                </div>
                                                            </div>
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
                            }
                            
ReactDOM.render(<Main />, document.getElementById('app'));