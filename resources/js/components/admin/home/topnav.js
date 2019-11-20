import React from 'react';

export default function topNav() {
    const [burgerClassActive,setBurgerClassActive] = React.useState(false);
    return (
        <nav className="navbar is-primary">
            <div className="navbar-brand">
                <a href="#" className="navbar-item">
                    <img src="https://bulma.io/images/bulma-logo-white.png" width="112" height="28"/>
                </a>
                    <a onClick={()=>setBurgerClassActive(!burgerClassActive)} role="button" className={burgerClassActive?"navbar-burger burger is-active":"navbar-burger burger"} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                    </div>
                <div id="navbarBasicExample" className={burgerClassActive?"navbar-menu is-active":"navbar-menu"}>
                    
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