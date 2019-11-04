import React from 'react';

export default function topNav() {

    return (
        <nav className="navbar is-primary">
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: Free, open source, and modern CSS framework based on Flexbox" width="112" height="28" />
                    </a>
                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">

                            <a className="button is-light">
                                <strong>Log out</strong>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )

}