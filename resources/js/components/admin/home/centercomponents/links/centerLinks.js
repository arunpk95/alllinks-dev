import React from 'react'
import LinkService from '../../../../helpers/services/linkServices'
import UserServices from '../../../../helpers/services/userServices'
import Settings from '../../../../helpers/settings'
import DateTimePicker from 'react-datetime-picker'

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
    const [scheduled_from, setScheduledFrom] = React.useState(props.link.scheduled_from ? props.link.scheduled_from : new Date());
    const [scheduled_to, setScheduledTo] = React.useState(props.link.scheduled_to ? props.link.scheduled_to : new Date());
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
        console.log('saving')
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


    function updateThumbUrl(url) {
        setthumbUploading(true);
        linkServices.updateThumb({ thumb_url: url, tenant_id: props.link.tenant_id }, props.link.id)
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

        if (event.target.files[0] == null) {
            return;
        }

        formData.append('image', event.target.files[0])
        setthumbUploading(true);
        userServices.uploadAvatar(formData)
            .then(response => {
                if (response.data.success) {
                    setThumbUploadError({});
                    updateThumbUrl(settings.homeURL + response.data.success)
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
            <div className="columns" style={{"margin-bottom":"0px"}}>
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
                                <a onClick={() => { bottomFormContent == 'thumb' ? setBottomFormContent('') : setBottomFormContent('thumb') }} className="fav-form-link-form"><span><i className="far fa-images"></i></span></a>
                            </div>
                            <div className="column" style={{ "padding": "0px" }}>
                                <a onClick={() => { bottomFormContent == 'schedule' ? setBottomFormContent('') : setBottomFormContent('schedule') }} className="fav-form-link-form"><span><i className="fas fa-stopwatch"></i></span></a>
                            </div>
                            <div className="column" style={{ "padding": "0px" }}>
                                <a onClick={() => { bottomFormContent == 'stat' ? setBottomFormContent('') : setBottomFormContent('stat') }} className="fav-form-link-form"><span><i className="fas fa-chart-line"></i></span></a>
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
                <span className="help is-danger" >{validation_error.scheduled_to}</span>
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
                        <label className="checkbox">
                            <input type="checkbox" disabled={loading} checked={is_scheduled} onChange={() => setIsScheduled(!is_scheduled)} />
                            Schedule
                        </label>
                        {is_scheduled ?
                            <div>
                                <label className="label">Active From(YYYY-MM-DD HH:MM:SS)(24 hrs):</label>
                                <DateTimePicker
                                    onChange={(date) => setScheduledFrom(date)}
                                    value={scheduled_from}
                                    format="yyyy-MM-dd HH:mm:ss"
                                    name="scheduled_from"
                                    renderSecondHand={true}
                                    required={true}
                                    disabled={loading} />

                                <label className="label">Active Till(YYYY-MM-DD HH:MM:SS)(24 hrs):</label>
                                <DateTimePicker
                                    onChange={(date) => setScheduledTo(date)}
                                    value={scheduled_to}
                                    format="yyyy-MM-dd HH:mm:ss"
                                    name="scheduled_to"
                                    renderSecondHand={true}
                                    required={true}
                                    disabled={loading} />

                                    <label className="label">Select Timezone:</label>
                                    <div className="control" style={{"paddingBottom":"10px"}} >
                                        <div className="select">
                                            <select defaultValue={scheduled_timezone} onChange={e => setScheduledTimezone(e.target.value)}>
                                                <option value="Pacific/Midway">(GMT-11:00) Midway Island, Samoa</option>
                                                <option value="America/Adak">(GMT-10:00) Hawaii-Aleutian</option>
                                                <option value="Etc/GMT+10">(GMT-10:00) Hawaii</option>
                                                <option value="Pacific/Marquesas">(GMT-09:30) Marquesas Islands</option>
                                                <option value="Pacific/Gambier">(GMT-09:00) Gambier Islands</option>
                                                <option value="America/Anchorage">(GMT-09:00) Alaska</option>
                                                <option value="America/Ensenada">(GMT-08:00) Tijuana, Baja California</option>
                                                <option value="Etc/GMT+8">(GMT-08:00) Pitcairn Islands</option>
                                                <option value="America/Los_Angeles">(GMT-08:00) Pacific Time (US & Canada)</option>
                                                <option value="America/Denver">(GMT-07:00) Mountain Time (US & Canada)</option>
                                                <option value="America/Chihuahua">(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
                                                <option value="America/Dawson_Creek">(GMT-07:00) Arizona</option>
                                                <option value="America/Belize">(GMT-06:00) Saskatchewan, Central America</option>
                                                <option value="America/Cancun">(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
                                                <option value="Chile/EasterIsland">(GMT-06:00) Easter Island</option>
                                                <option value="America/Chicago">(GMT-06:00) Central Time (US & Canada)</option>
                                                <option value="America/New_York">(GMT-05:00) Eastern Time (US & Canada)</option>
                                                <option value="America/Havana">(GMT-05:00) Cuba</option>
                                                <option value="America/Bogota">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
                                                <option value="America/Caracas">(GMT-04:30) Caracas</option>
                                                <option value="America/Santiago">(GMT-04:00) Santiago</option>
                                                <option value="America/La_Paz">(GMT-04:00) La Paz</option>
                                                <option value="Atlantic/Stanley">(GMT-04:00) Faukland Islands</option>
                                                <option value="America/Campo_Grande">(GMT-04:00) Brazil</option>
                                                <option value="America/Goose_Bay">(GMT-04:00) Atlantic Time (Goose Bay)</option>
                                                <option value="America/Glace_Bay">(GMT-04:00) Atlantic Time (Canada)</option>
                                                <option value="America/St_Johns">(GMT-03:30) Newfoundland</option>
                                                <option value="America/Araguaina">(GMT-03:00) UTC-3</option>
                                                <option value="America/Montevideo">(GMT-03:00) Montevideo</option>
                                                <option value="America/Miquelon">(GMT-03:00) Miquelon, St. Pierre</option>
                                                <option value="America/Godthab">(GMT-03:00) Greenland</option>
                                                <option value="America/Argentina/Buenos_Aires">(GMT-03:00) Buenos Aires</option>
                                                <option value="America/Sao_Paulo">(GMT-03:00) Brasilia</option>
                                                <option value="America/Noronha">(GMT-02:00) Mid-Atlantic</option>
                                                <option value="Atlantic/Cape_Verde">(GMT-01:00) Cape Verde Is.</option>
                                                <option value="Atlantic/Azores">(GMT-01:00) Azores</option>
                                                <option value="Europe/Belfast">(GMT) Greenwich Mean Time : Belfast</option>
                                                <option value="Europe/Dublin">(GMT) Greenwich Mean Time : Dublin</option>
                                                <option value="Europe/Lisbon">(GMT) Greenwich Mean Time : Lisbon</option>
                                                <option value="Europe/London">(GMT) Greenwich Mean Time : London</option>
                                                <option value="Africa/Abidjan">(GMT) Monrovia, Reykjavik</option>
                                                <option value="Europe/Amsterdam">(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
                                                <option value="Europe/Belgrade">(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
                                                <option value="Europe/Brussels">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
                                                <option value="Africa/Algiers">(GMT+01:00) West Central Africa</option>
                                                <option value="Africa/Windhoek">(GMT+01:00) Windhoek</option>
                                                <option value="Asia/Beirut">(GMT+02:00) Beirut</option>
                                                <option value="Africa/Cairo">(GMT+02:00) Cairo</option>
                                                <option value="Asia/Gaza">(GMT+02:00) Gaza</option>
                                                <option value="Africa/Blantyre">(GMT+02:00) Harare, Pretoria</option>
                                                <option value="Asia/Jerusalem">(GMT+02:00) Jerusalem</option>
                                                <option value="Europe/Minsk">(GMT+02:00) Minsk</option>
                                                <option value="Asia/Damascus">(GMT+02:00) Syria</option>
                                                <option value="Europe/Moscow">(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
                                                <option value="Africa/Addis_Ababa">(GMT+03:00) Nairobi</option>
                                                <option value="Asia/Tehran">(GMT+03:30) Tehran</option>
                                                <option value="Asia/Dubai">(GMT+04:00) Abu Dhabi, Muscat</option>
                                                <option value="Asia/Yerevan">(GMT+04:00) Yerevan</option>
                                                <option value="Asia/Kabul">(GMT+04:30) Kabul</option>
                                                <option value="Asia/Yekaterinburg">(GMT+05:00) Ekaterinburg</option>
                                                <option value="Asia/Tashkent">(GMT+05:00) Tashkent</option>
                                                <option value="Asia/Kolkata">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                                                <option value="Asia/Katmandu">(GMT+05:45) Kathmandu</option>
                                                <option value="Asia/Dhaka">(GMT+06:00) Astana, Dhaka</option>
                                                <option value="Asia/Novosibirsk">(GMT+06:00) Novosibirsk</option>
                                                <option value="Asia/Rangoon">(GMT+06:30) Yangon (Rangoon)</option>
                                                <option value="Asia/Bangkok">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                                                <option value="Asia/Krasnoyarsk">(GMT+07:00) Krasnoyarsk</option>
                                                <option value="Asia/Hong_Kong">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
                                                <option value="Asia/Irkutsk">(GMT+08:00) Irkutsk, Ulaan Bataar</option>
                                                <option value="Australia/Perth">(GMT+08:00) Perth</option>
                                                <option value="Australia/Eucla">(GMT+08:45) Eucla</option>
                                                <option value="Asia/Tokyo">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
                                                <option value="Asia/Seoul">(GMT+09:00) Seoul</option>
                                                <option value="Asia/Yakutsk">(GMT+09:00) Yakutsk</option>
                                                <option value="Australia/Adelaide">(GMT+09:30) Adelaide</option>
                                                <option value="Australia/Darwin">(GMT+09:30) Darwin</option>
                                                <option value="Australia/Brisbane">(GMT+10:00) Brisbane</option>
                                                <option value="Australia/Hobart">(GMT+10:00) Hobart</option>
                                                <option value="Asia/Vladivostok">(GMT+10:00) Vladivostok</option>
                                                <option value="Australia/Lord_Howe">(GMT+10:30) Lord Howe Island</option>
                                                <option value="Etc/GMT-11">(GMT+11:00) Solomon Is., New Caledonia</option>
                                                <option value="Asia/Magadan">(GMT+11:00) Magadan</option>
                                                <option value="Pacific/Norfolk">(GMT+11:30) Norfolk Island</option>
                                                <option value="Asia/Anadyr">(GMT+12:00) Anadyr, Kamchatka</option>
                                                <option value="Pacific/Auckland">(GMT+12:00) Auckland, Wellington</option>
                                                <option value="Etc/GMT-12">(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
                                                <option value="Pacific/Chatham">(GMT+12:45) Chatham Islands</option>
                                                <option value="Pacific/Tongatapu">(GMT+13:00) Nuku'alofa</option>
                                                <option value="Pacific/Kiritimati">(GMT+14:00) Kiritimati</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            :
                            null}

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