import React from 'react'

export default function centerLinks(props) {
    return (
        <div style={{ "border": "2px black solid", "marginTop": "20px" }}>
            <div className="columns">
                <div className="column is-1">
                    <div>
                        <a className="fav-form-link-form">
                            <div><i className="fas fa-sort-up"></i></div>
                        </a>
                        <a className="fav-form-link-form">
                            <div><i className="fas fa-ellipsis-v"></i></div>
                        </a>
                        <a className="fav-form-link-form">
                            <div><i className="fas fa-sort-down"></i></div>
                        </a>
                    </div>
                </div>
                <div className="column is-8">
                    
                        <span>
                                <input className="edit-link-input" value={props.link.title}></input>

                        </span>
                        <br />
                        <hr style={{ "margin": "0.5rem 0rem .5rem 0rem", "background": "darkgray" }} />

                        <span>
                                <input className="edit-link-input" value={props.link.url}></input>

                        </span>                
                </div>
                <div className="column is-3">
                    <div>
                        <div className="columns" style={{ "margin": "0px" }}>
                            <div className="column" style={{ "padding": "0px" }}>
                                <a className="fav-form-link-form"><span><i className="far fa-images"></i></span></a>
                            </div>
                            <div className="column" style={{ "padding": "0px" }}>
                                <a className="fav-form-link-form"><span><i className="fas fa-stopwatch"></i></span></a>
                            </div>
                            <div className="column" style={{ "padding": "0px" }}>
                                <a className="fav-form-link-form"><span><i className="fas fa-stopwatch"></i></span></a>
                            </div>
                        </div>
                        <hr style={{ "margin": "0.5rem 0rem .5rem 0rem", "background": "darkgray" }} />
                        <div>
                            <div className="columns" style={{ "margin": "0px" }}>
                                <div className="column" style={{ "padding": "0px" }}>
                                    <a className="fav-form-link-form"><span><i className="fas fa-trash-alt"></i></span></a>
                                </div>
                                <div className="column" style={{ "padding": "0px" }}>
                                    <a className="fav-form-link-form"><span><i className="fas fa-toggle-on"></i></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}