import React from 'react';
import UserServices from '../../helpers/services/userServices'
import NewTenantModel from './newTenantModel'

export default function selectTenant() {
    const [tenants, setTenants] = React.useState([]);
    const [userServices] = React.useState(new UserServices());
    const [selectedTenant,setSelectedTenant] = React.useState({});
    const [isSelectedOrSelectText,setIsSelectedOrSelectText] = React.useState('Select the Tenant');
    const [showCreateTenantModel,setShowCreateTenantModel] = React.useState(false);
    React.useEffect(() => {
        userServices.getTenants()
            .then(response => {
                if(response.data.success)
                {
                    console.log("fetched tenants");
                    if(response.data.success[0]==null)
                    {
                        console.log("No Tenants");
                    }
                    else
                    {
                        setTenants(response.data.success)
                    }
                }
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }, [])
    React.useEffect(() => {
        if(selectedTenant.id)
        {
            setIsSelectedOrSelectText(selectedTenant.tenant_text);
        }
        else
        {
            setIsSelectedOrSelectText('Select the Tenant');
        }
    }, [selectedTenant]);
    React.useEffect(() => {
    },[]);  


    return (
        <div>
            <div className="dropdown">
                <div className="dropbtn">{isSelectedOrSelectText}  &nbsp;&nbsp; <i className="fas fa-chevron-circle-down"></i>
                </div>
                <div className="dropdown-content">
                    {tenants.map(function(tenant,index){
                        return<a key={tenant.id} onClick={() => setSelectedTenant(tenant)}>{tenant.tenant_text}</a>
                    })}
                    <a  onClick={()=>setShowCreateTenantModel(true)}> <i className="fas fa-plus"></i> &nbsp;&nbsp;     New Tenant </a>
                </div>
            </div>
            <NewTenantModel parentCallback = {()=>setShowCreateTenantModel(false)} showState={showCreateTenantModel}/>
        </div>
    )
}