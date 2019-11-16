import React, { useState, useEffect } from "react"
import TenantServices from '../../helpers/services/tenantServices'
import UserServices from '../../helpers/services/userServices'
import DateTimePicker from 'react-datetime-picker'
import Settings from '../../helpers/settings'


export default function selectTenant(props) {
    
    const [settings] = React.useState(new Settings)

    const [loading, setLoading] = React.useState(false);
    const [validationErrors, setValidationErrors] = React.useState("{}");

    const [tenantServices, setTenantServices] = React.useState(new TenantServices());
    const [userServices, setUserServices] = React.useState(new UserServices());

    const [tenant_name, setTenantName] = React.useState('');
    const [tenant_text, setTenantText] = React.useState('');
    const [is_leap_link_active, setIs_leap_link_active] = React.useState(false);
    const [leap_link_time_from, setLeap_link_time_from] = useState(new Date());
    const [leap_link_time_to, setLeap_link_time_to] = useState(new Date());
    const [leap_link_url, setLeap_link_url] = useState('');
    const [leap_link_timezone, setLeap_link_timezone] = useState('Europe/London');
    const [thumb_image_url, setThumb_image_url] = useState('https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png');

    //Determine error in image upload
    const [thumb_upload_error, setThumbUploadError] = useState({});

    //Determine state of model
    const [showState, setShowState] = React.useState('is-clipped');

    //pass true to refresh on new tenant creation
    const [newTenantCreated,setNewTenantCreated] = React.useState(false);
            
    React.useEffect(() => {
        if (props.showState) {
            //console.log('in');
            setShowState('is-active');
        }
        
    }, [props]);




    const saveHandler = () => {
        setLoading(true);
        setValidationErrors({});
        //.toISOString().replace('T', ' ').slice(0, 20)
        tenantServices.createTenant({
            tenant_name: tenant_name,
            tenant_text: tenant_text,
            is_leap_link_active: is_leap_link_active,
            leap_link_time_from: leap_link_time_from,
            leap_link_time_to: leap_link_time_to,
            leap_link_url: leap_link_url,
            leap_link_timezone: leap_link_timezone,
            thumb_image_url: thumb_image_url
        })
            .then(response => {
                setLoading(false);
                setValidationErrors({});
                if (response.data.success) {
                    //console.log("created tenants");
                    //console.log(response.data.success)
                    setNewTenantCreated(true);
                    setShowState('is-clipped');
                    props.parentCallback(true);
                }
                return response;
            })
            .catch((error) => {
                setLoading(false);
                if (error.response.status == 401 && error.response.data.error) {
                    setValidationErrors(error.response.data.error);
                }
            });
    }


    function handleAvatarSelectionChange(event) {
        const formData = new FormData();
        formData.append('image', event.target.files[0])
        setThumb_image_url(settings.homeURL+'images/flatloader.svg');
        userServices.uploadAvatar(formData)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data);
                    setThumbUploadError({});
                    setThumb_image_url(settings.homeURL+response.data.success);
                }
                return response;
            })
            .catch((error) => {
                setThumb_image_url('https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png');
                //console.log(error);
                if (error.response.status == 401 && error.response.data.error) {
                    setThumbUploadError(error.response.data.error);
                }
            });
    }


    return (
        <div className={"modal " + showState}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Create New Tenant</p>
                    <button className="delete" aria-label="close" onClick={() => {
                        setShowState('is-clipped');
                        props.parentCallback(newTenantCreated)
                    }}></button>
                </header>
                <section className="modal-card-body">

                    <form>
                        <div className="field">
                            <label className="label">Slug - appears in your URL:</label>
                            <div className="control">
                                <input  disabled={loading} className="input" type="text" placeholder="Slug" value={tenant_name} onChange={e => setTenantName(e.target.value)} />
                                <span className="help is-danger" >{validationErrors.tenant_name}</span>
                                <p className="help">Only Alphanumeric, - and _ are allowed.</p>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Name - Appears on title:</label>
                            <div className="control">
                                <input disabled={loading} className="input" type="text" placeholder="Slug" value={tenant_text} onChange={e => setTenantText(e.target.value)} />
                                <span className="help is-danger" >{validationErrors.tenant_text}</span>
                                <p className="help">If Blank will be same as Slug</p>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Change Avatar:</label>
                            <div className="avatar-upload">
                                <div className="avatar-edit">
                                    <input disabled={loading} type='file' id="imageUpload" accept=".png, .jpg, .jpeg" onChange={e => handleAvatarSelectionChange(e)} />
                                    <label htmlFor="imageUpload"><i className="fas fa-pencil-alt avatar-edit-icon"></i></label>
                                </div>
                                <div className="avatar-preview">
                                    <div id="imagePreview" style={{ "backgroundImage": "url(" + thumb_image_url + ")" }}>

                                    </div>
                                    <span className="help is-danger" >{thumb_upload_error.image}</span>
                                </div>
                            </div>
                        </div>
                        <label className="checkbox">
                            <input disabled={loading} type="checkbox" checked={is_leap_link_active} onChange={() => setIs_leap_link_active(!is_leap_link_active)}></input>
                            Activate Leap Link  (Redirects Directly to the URL)
                        </label>

                        <div style={is_leap_link_active ? { "paddingTop": "15 px" } : { "display": "none" }}>
                            <div className="field">
                                <label className="label">Leap Link URL:</label>
                                <div className="control">
                                    <input disabled={loading} className="input" type="text" placeholder="Leap Link URL" value={leap_link_url} onChange={e => setLeap_link_url(e.target.value)} />
                                    <span className="help is-danger" >{validationErrors.leap_link_url}</span>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label">Leap Link Active From(YYYY-MM-DD HH:MM:SS)(24 hrs):</label>
                                    <DateTimePicker
                                        onChange={(date) => setLeap_link_time_from(date)}
                                        value={leap_link_time_from}
                                        format="yyyy-MM-dd HH:mm:ss"
                                        name="leap_link_time_from"
                                        renderSecondHand={true}
                                        required={true}
                                        disabled={loading} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label">Leap Link Active Till(YYYY-MM-DD HH:MM:SS)(24 hrs):</label>
                                    <DateTimePicker
                                        onChange={(date) => setLeap_link_time_to(date)}
                                        value={leap_link_time_to}
                                        format="yyyy-MM-dd HH:mm:ss"
                                        name="leap_link_time_to"
                                        renderSecondHand={true}
                                        required={true}
                                        disabled={loading} />
                                </div>
                                <span className="help is-danger" >{validationErrors.leap_link_time_to}</span>
                            </div>
                            <div className="field">
                                <label className="label">Select Timezone:</label>
                                <div className="control">
                                    <div className="select" >
                                        <select defaultValue={leap_link_timezone} onChange={e => setLeap_link_timezone(e.target.value)}>
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
                        </div>

                    </form>


                </section>
                <footer className="modal-card-foot">
                    <button disabled={loading} className="button is-success"
                        onClick={e => {
                            saveHandler();
                        }}>Save changes</button>
                    <button disabled={loading} className="button" onClick={() => {
                        setShowState('is-clipped');
                        props.parentCallback(newTenantCreated)
                    }}>Cancel</button>
                </footer>
            </div>
        </div >

    );
}