import React, { useState, useEffect } from "react"
import TenantServices from '../../helpers/services/tenantServices'
//https://www.npmjs.com/package/react-datetime-picker
import DateTimePicker from 'react-datetime-picker'

export default function selectTenant(props) {

    const [loading, setLoading] = React.useState(false);
    const [validationErrors, setValidationErros] = React.useState("{}");

    const [tenantServices, setTenantServices] = React.useState(new TenantServices());
    const [tenant_name, setTenantName] = React.useState('');
    const [tenant_text, setTenantText] = React.useState('');
    const [is_leap_link_active,setIs_leap_link_active] = React.useState(false);
    const [leap_link_time_from	, setLeap_link_time_from] = useState(new Date());
    const [leap_link_time_to	, setLeap_link_time_to] = useState(new Date()+1);
    const [leap_link_url,setLeap_link_url] = useState('');
    const [leap_link_timezone, setLeap_link_timezone] = useState('GMT');
    const [thumb_image_url, setThumb_image_url] = useState('');



    const [showState, setShowState] = React.useState('is-clipped');
    React.useEffect(() => {
        if (props.showState) {
            console.log('in');
            setShowState('is-active');
        }
    }, [props]);




    const redirectLogin = (event) => {
        console.log("Sign in");
        window.location.href = "http://127.0.0.1:8000/login"
    };

    const saveHandler = () => {
        setLoading(true);
        tenantServices.createTenant({
            tenant_name: tenant_name,
            tenant_text:tenant_text,
            is_leap_link_active:is_leap_link_active,
            leap_link_time_from:leap_link_time_from,
            leap_link_time_to:leap_link_time_to,
            leap_link_url:leap_link_url,
            leap_link_timezone:leap_link_timezone,
            thumb_image_url:thumb_image_url
        })
            .then(response => {
                setLoading(false);
                setValidationErros({});
                if (response.data.success) {
                    console.log("fetched tenants");
                    if (response.data.success[0] == null) {
                        console.log("No Tenants");
                    }
                    else {
                        setTenants(response.data.success)
                    }
                }
                return response;
            })
            .catch((error) => {
                if (error.response.status == 401) {
                    setValidationErros(error.response.data.error);
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
                        props.parentCallback(false)
                    }}></button>
                </header>
                <section className="modal-card-body">


                    <form >
                        <div className="field">
                            <label className="label">Slug - appears in your URL</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Slug" disabled={false} value={tenant_name} onChange={e => setTenantName(e.target.value)} />
                                <span className="help is-danger" >{validationErrors.tenant_name}</span>
                                <p className="help">Only Alphanumeric, - and _ are allowed.</p>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Name - Appears on title</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Slug" disabled={false} value={tenant_text} onChange={e => setTenantText(e.target.value)} />
                                <span className="help is-danger" >{validationErrors.tenant_text}</span>
                                <p className="help">If Blank will be same as Slug</p>
                            </div>
                        </div>
                        <label className="checkbox">
                            <input type="checkbox" checked={is_leap_link_active} onChange={()=>setIs_leap_link_active(!is_leap_link_active)}></input>
                            Activate Leap Link  (Redirects Directly to the URL)
                        </label>
                        <div style={is_leap_link_active?{}:{"display":"none"}}>
                        
                        <DateTimePicker
                            onChange={(date)=>setLeap_link_time_from(date)}
                            value={leap_link_time_from}
                            format="dd-MM-y h:mm:ss a"
                            minDate={leap_link_time_from}
                            name="leap_link_time_from"
                            renderSecondHand="true"
                              />
                        </div>
                    </form>


                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success"
                        onClick={e => {
                            saveHandler();
                        }}>Save changes</button>
                    <button className="button" onClick={() => {
                        setShowState('is-clipped');
                        props.parentCallback(false)
                    }}>Cancel</button>
                </footer>
            </div>
        </div>

    );
}