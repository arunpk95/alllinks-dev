import React from 'react';
import UserServices from '../../helpers/services/userServices'

export default function selectTenant() {
    const [tenants, setTenants] = React.useState([]);
    const [userServices] = React.useState(new UserServices());
    const [selectedTenant,setSelectedTenant] = React.useState({});
    const [isSelectedOrSelectText,setIsSelectedOrSelectText] = React.useState('Select the Tenant');
    React.useEffect(() => {
        userServices.getTenants()
            .then(response => {
                // If request is good...
                //console.log(response.data);
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



    return (
        <div>
            <div className="dropdown">
                <div className="dropbtn">{isSelectedOrSelectText}  &nbsp;&nbsp; <i className="fas fa-chevron-circle-down"></i>
                </div>
                <div className="dropdown-content">
                    {tenants.map(function(tenant,index){
                        return<a key={tenant.id} onClick={() => setSelectedTenant(tenant)}>{tenant.tenant_text}</a>
                    })}
                    <a> <i className="fas fa-plus"></i> &nbsp;&nbsp;     New Tenant </a>
                </div>
            </div>
        </div>
    )
}