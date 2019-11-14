import React from 'react'
import LinkService from '../../../../helpers/services/linkServices'
import UserServices from '../../../../helpers/services/userServices'
import Settings from '../../../../helpers/settings'

export default function centerLinks(props) {

    //backup prop links
    const [backup, setBackup] = React.useState(props)
    //for state change
    const [stateChanged, setStateChanged] = React.useState(false);

    //to prevent statechanged from changin on initial render
    const isInitialMount = React.useRef(true);

    //to handle reset on cancel
    const [reset, setReset] = React.useState(false);

    //show react bottom form count
    const [bottomFormContent, setBottomFormContent] = React.useState('');

    //to handle upload
    const linkImageUpload = React.createRef();

    const [linkServices] = React.useState(new LinkService);
    const [userServices] = React.useState(new UserServices);
    
    const [settings] = React.useState(new Settings)

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
    const [thumb_upload_error, setThumbUploadError] = React.useState({});
    const [thumb_uploading, setthumbUploading] = React.useState(false);


    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            // Your useEffect code here to be run on update
            setStateChanged(true);
            setReset(false);
        }
    }, [title, url, is_scheduled, scheduled_from, scheduled_to, scheduled_timezone])

    React.useEffect(() => {
        setStateChanged(false);
    }, [reset])

    function cancelStateUpdate() {
        setTitle(backup.link.title);
        setUrl(backup.link.url);
        setStatus(backup.link.status);
        setIsScheduled(backup.link.is_scheduled);
        setScheduledFrom(backup.link.scheduled_from);
        setScheduledTo(backup.link.scheduled_to);
        setScheduledTimezone(backup.link.scheduled_timezone);
        setThumbURL(backup.link.thumb_url);
        setValidationErrors({});
        setThumbUploadError({});
        setLoading(false);

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
                    setBackup({ link: response.data.success })
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

    const deleteHandler = () => {
        linkServices.updateLinkStatus({ status: "deleted", tenant_id: props.link.tenant_id }, props.link.id)
            .then(response => {
                if (response.data.success) {
                    props.unmountDeleted(props.index);
                }
            }
            )
    }


    function updateThumbUrl(url){
        setthumbUploading(true);
        linkServices.updateThumb({thumb_url:url,tenant_id:props.link.tenant_id},props.link.id)
        .then(response => {
            if (response.data.success) {
                setThumbUploadError({});
                setThumbURL(response.data.success.thumb_url);
                setBackup({ link: response.data.success })
                setthumbUploading(false)
            }
            return response;
        })
        .catch((error) => {
            setThumbURL(backup.link.thumb_url);
            //console.log(error);
            setthumbUploading(false)
            if (error.response.status == 401 && error.response.data.error) {
                setThumbUploadError(error.response.data.error);
            }
        });
    }

    function handleAvatarSelectionChange(event) {
        const formData = new FormData();
        
        if(event.target.files[0]==null)
        {
            return;
        }
        
        formData.append('image', event.target.files[0])
        setthumbUploading(true);
        userServices.uploadAvatar(formData)
            .then(response => {
                if (response.data.success) {
                    setThumbUploadError({});
                    updateThumbUrl(settings.homeURL+response.data.success)
                    }
                return response;
            })
            .catch((error) => {
                setThumbURL(backup.link.thumb_url);
                //console.log(error);
                setthumbUploading(false)
                if (error.response.status == 401 && error.response.data.error) {
                    setThumbUploadError(error.response.data.error);
                }
            });
    }





    function selectImage() {
        const object = linkImageUpload.current;
        object.click();
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
                        <input className="edit-link-input" style={{ "marginTop": "0.3rem" }} value={title} onChange={e => setTitle(e.target.value)} ></input>
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
                                <a onClick={() => setBottomFormContent('thumb')} className="fav-form-link-form"><span><i className="far fa-images"></i></span></a>
                            </div>
                            <div className="column" style={{ "padding": "0px" }}>
                                <a onClick={() => setBottomFormContent('schedule')} className="fav-form-link-form"><span><i className="fas fa-stopwatch"></i></span></a>
                            </div>
                            <div className="column" style={{ "padding": "0px" }}>
                                <a onClick={() => setBottomFormContent('stat')} className="fav-form-link-form"><span><i className="fas fa-chart-line"></i></span></a>
                            </div>
                        </div>
                        <hr style={{ "margin": "0.5rem 0rem .5rem 0rem", "background": "darkgray" }} />
                        <div>
                            <div className="columns" style={{ "margin": "0px" }}>
                                <div className="column" style={{ "padding": "0px" }}>
                                    <a className="fav-form-link-form" onClick={deleteHandler}><span><i className="fas fa-trash-alt"></i></span></a>
                                </div>
                                <div className="column" style={{ "padding": "0px" }}>
                                    <button className={status == "created" ? "link-off" : "link-on"}
                                        onClick={() => {
                                            const newstatus = status == "created" ? "active" : "created"
                                            linkServices.updateLinkStatus({ status: newstatus, tenant_id: props.link.tenant_id }, props.link.id)
                                                .then(response => {
                                                    if (response.data.success) {
                                                        response.data.success.status == "active" ? setStatus("active") : setStatus("created")
                                                        setBackup({ link: response.data.success })
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
            <div>
                <span className="help is-danger" >{validation_error.title}</span>
                <span className="help is-danger" >{validation_error.url}</span>
                <span className="help is-danger" >{thumb_upload_error.image}</span>
            </div>
            <input style={{ "display": "none" }} type='file' ref={linkImageUpload} accept=".png, .jpg, .jpeg" onChange={e => handleAvatarSelectionChange(e)} />
                                
            {
                bottomFormContent == 'thumb' ?
                    (<div style={{ "paddingBottom": "7px" }}>
                        {thumb_url == null ?
                            <div>
                                <button onClick={() => selectImage()}
                                    className={thumb_uploading ? "button is-link is-small is-loading" : "button is-link is-small"}>Add Image</button>
                            </div>
                            :
                            (
                                <div style={{ "height": "100px" }}>
                                    <img width="72px" height="72px" src={thumb_url} />
                                    <button style={{ "marginLeft": "7px", "marginTop": "20px" }} onClick={() => selectImage()} className={thumb_uploading ? "button is-link is-small is-loading" : "button is-link is-small"}>change</button>
                                    <button style={{ "marginLeft": "7px", "marginTop": "20px" }} onClick={() => updateThumbUrl("")} className={thumb_uploading ? "button is-small is-loading" : "button is-small"}>remove</button>
                                </div>
                            )
                        }
                    </div>
                    )
                    :
                    ''
            }
            {
                bottomFormContent == 'schedule' ?
                    (<div>
                        Will Be Added in Future
                    </div>
                    )
                    :
                    ''
            }
            {
                bottomFormContent == 'stat' ?
                    (<div>
                        Will Be Added in Future
                    </div>
                    )
                    :
                    ''
            }



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