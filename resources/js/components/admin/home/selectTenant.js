import React from 'react';
import UserServices from '../../helpers/services/userServices'
import NewTenantModel from './newTenantModel'
import LoadingIcon from '../../helpers/loadingicon';
import ActiveTenantContext from '../contexts/activeTenantContext'

export default function selectTenant(props) {
    const [tenants, setTenants] = React.useState([]);
    const [userServices] = React.useState(new UserServices());
    const [selectedTenant, setSelectedTenant] = React.useState({});
    const [isSelectedOrSelectText, setIsSelectedOrSelectText] = React.useState('Select the Tenant');
    const [showCreateTenantModel, setShowCreateTenantModel] = React.useState(false);
    const [modelChildKey, setModelChildKey] = React.useState(0);
    const [loadingTenants, setLoadingTenants] = React.useState(false);

    const [newTenantCreated, setNewTenantCreated] = React.useState(false);

    const activeTenantContext = React.useContext(ActiveTenantContext);

    React.useEffect(() => {
        setLoadingTenants(true);
        userServices.getTenants()
            .then(response => {
                if (response.data.success) {
                    //console.log("fetched tenants");
                    setLoadingTenants(false);
                    if (response.data.success[0] == null) {
                        console.log("No Tenants");
                    }
                    else {
                        setTenants(response.data.success)
                    }
                }
            })
            .catch((error) => {
                setLoadingTenants(false);
            });
    }, [newTenantCreated]);

    React.useEffect(() => {
        if (selectedTenant.id) {
            setIsSelectedOrSelectText(selectedTenant.tenant_text);
        }
        else {
            setIsSelectedOrSelectText('Select the Tenant');
        }
    }, [selectedTenant]);
    React.useEffect(() => {
    }, []);


    return (
        <div>
            <div className="dropdown">
                <div className="dropbtn">{isSelectedOrSelectText}  &nbsp;&nbsp; <i className="fas fa-chevron-circle-down"></i>
                </div>
                <div className="dropdown-content">
                    {loadingTenants ? <a><LoadingIcon /></a> : null}
                    {tenants.map(function (tenant, index) {
                        return <a key={tenant.id} onClick={() => {
                            setSelectedTenant(tenant);
                            activeTenantContext.setActiveTenant(tenant);
                            props.changeCenterContent('')
                        }
                        }>{tenant.tenant_text}</a>
                    })}
                    <a onClick={() => { setShowCreateTenantModel(true); setNewTenantCreated(false); }}> <i className="fas fa-plus"></i> &nbsp;&nbsp;     New Tenant </a>
                </div>
            </div>
            <NewTenantModel
                parentCallback={(callbackNewTenantCreated) => { console.log('back ' + callbackNewTenantCreated); setShowCreateTenantModel(false); setNewTenantCreated(callbackNewTenantCreated); setModelChildKey(modelChildKey => modelChildKey + 1) }}
                showState={showCreateTenantModel}
                key={modelChildKey} />
        </div>
    )
}   