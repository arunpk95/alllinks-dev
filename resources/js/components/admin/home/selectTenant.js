import React from 'react';
import UserServices from '../../helpers/services/userServices'

export default function selectTenant()
{
    const[tenants,setTenants]=React.useState("{}");
    const[userServices]= React.useState(new UserServices());
    React.useEffect(() => {
        userServices.getTenants()
        .then(response => {
            // If request is good...
            console.log(response.data);
         })
        .catch((error) => {
            console.log('error ' + error);
         });
    }, [])
    
    return (
        <div></div>
    )
}