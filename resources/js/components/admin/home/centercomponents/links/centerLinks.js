import React from 'react'
import LinkService from '../../../../helpers/services/linkServices'

export default function centerLinks(props) {


    //for state change
    const [stateChanged, setStateChanged] = React.useState(false);

    //to prevent statechanged from changin on initial render
    const isInitialMount = React.useRef(true);

    //to handle reset on cancel
    const [reset, setReset] = React.useState(false);

    const [linkServices] = React.useState(new LinkService);

    const [title, setTitle] = React.useState(props.link.title);
    const [url, setUrl] = React.useState(props.link.url);
    const [status, setStatus] = React.useState(props.link.status);
    const [is_scheduled, setIsScheduled] = React.useState(props.link.is_scheduled);
    const [scheduled_from, setScheduledFrom] = React.useState(props.link.scheduled_from);
    const [scheduled_to, setScheduledTo] = React.useState(props.link.scheduled_to);
    const [scheduled_timezone, setScheduledTimezone] = React.useState(props.link.scheduled_timezone);
    const [thumb_url, setThumbURL] = React.useState(props.link.thumb_url);

    const [validation_error, setValidationErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);


    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            // Your useEffect code here to be run on update
            setStateChanged(true);
            setReset(false);
        }
    }, [title, url, is_scheduled, scheduled_from, scheduled_to, scheduled_timezone, thumb_url])

    React.useEffect(() => {
        setStateChanged(false);
    }, [reset])

    function cancelStateUpdate() {
        setTitle(props.link.title);
        setUrl(props.link.url);
        setStatus(props.link.status);
        setIsScheduled(props.link.is_scheduled);
        setScheduledFrom(props.link.scheduled_from);
        setScheduledTo(props.link.scheduled_to);
        setScheduledTimezone(props.link.scheduled_timezone);
        setThumbURL(props.link.thumb_url);

        setReset(true);
    }

    const saveHandler = () => {
        setValidationErrors({});
        setLoading(true);
        linkServices.updateLink({
            title: title,
            url: url,
            tenant_id: props.link.tenant_id,
            is_scheduled: is_scheduled,
            scheduled_from: scheduled_from,
            scheduled_to: scheduled_to,
            scheduled_timezone: scheduled_timezone,
            thumb_url: thumb_url
        },
            props.link.id
        )
            .then(response => {
                setValidationErrors({});
                setLoading(false);
                if (response.data.success) {
                    //console.log(response.data.success);
                    setStateChanged(false);
                }
                return response;
            })
            .catch((error) => {
                //console.log(error)
                setLoading(false);
                if (error.response.status == 401 && error.response.data.error) {
                    setValidationErrors(error.response.data.error);
                }
            });
    }


    return (
        <div style={{ "display": "flow-root", "border": "2px black solid", "marginTop": "20px" }}>
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
                        <input className="edit-link-input" style={{"margin-top": "0.3rem"}} value={title}  onChange={e => setTitle(e.target.value)} ></input>

                    </span>
                    <br />
                    <hr style={{ "margin": "0.5rem 0rem .5rem 0rem", "background": "darkgray" }} />

                    <span>
                        <input className="edit-link-input" value={url} onChange={e => setUrl(e.target.value)}></input>

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
                                    <button className={status == "created" ? "link-off" : "link-on"}
                                        onClick={() => {
                                            linkServices.updateLinkStatus({ status: status, tenant_id: props.link.tenant_id }, props.link.id)
                                                .then(response => {
                                                    if (response.data.success) {
                                                        response.data.success.status == "created" ? setStatus("active") : setStatus("created")
                                                    }
                                                }
                                                )
                                        }}
                                    >{status == "created" ? "off" : "on"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                stateChanged ?
                    (<div className="field is-grouped" style={{ "float": "right", "paddingBottom": "7px", "paddingRight": "7px" }}>
                        <p className="control">
                            <button onClick={cancelStateUpdate} className="button is-small" disabled={loading}>
                                Cancel
                    </button>
                        </p>
                        <p className="control">
                            <button onClick={saveHandler} className={loading ? "button is-link is-small is-loading" : "button is-link is-small"}>
                                Save changes
                     </button>
                        </p>
                    </div>)
                    : ""
            }

        </div>

    )
}