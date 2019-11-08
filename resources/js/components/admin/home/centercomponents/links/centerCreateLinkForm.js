import React from 'react'
import LinkServices from '../../../../helpers/services/linkServices'
import activeTenantContext, { ActiveTenantContextConsumer } from '../../../contexts/activeTenantContext'


export default function centerCreateLinkFrom(props) {
    const [loading,setLoading]=React.useState(false);
    const [validationErrors,setValidationErrors] = React.useState({});
    const [title,setTitle] = React.useState('');
    const [url,setURL] = React.useState('');
    const [linkServices, setLinkServices] = React.useState(new LinkServices())

    const tenantActive = React.useContext(activeTenantContext).activeTenant;
    const saveHandler = () => {
        setValidationErrors({});
        setLoading(true);
        linkServices.createLink({
            title: title,
            url: url,
            tenant_id:tenantActive.id
            
        })
            .then(response => {
                setLoading(false);
                setValidationErrors({});
                if (response.data.success) {
                     //console.log(response.data.success)
                     setTitle('');setURL('');
                     props.updateAllLinks();
                }
                return response;
            })
            .catch((error) => {
                console.log(error)
                setLoading(false);
                if (error.response.status == 401 && error.response.data.error) {
                    setValidationErrors(error.response.data.error);
                }
            });
    }


    return (
        <div style={{"paddingBottom":"10px"}}>
                <div className="field">
                    <div className="control">
                        <input disabled={loading} className="input" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                        <span className="help is-danger" >{validationErrors.title}</span>
                       </div>
                </div>
                <div className="field">
                    <div className="control">
                        <input disabled={loading} className="input" type="text" placeholder="URL" value={url} onChange={e => setURL(e.target.value)} />
                        <span className="help is-danger" >{validationErrors.url}</span>
                    </div>
                </div>
                <button
                onClick={e => {
                    saveHandler();
                }}
                 className={loading ? "button is-fullwidth is-primary is-loading" : "button is-fullwidth is-primary"}>Add New Link</button>

        </div>
    )
}