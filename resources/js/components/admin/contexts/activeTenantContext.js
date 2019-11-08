
import React, { createContext } from 'react';

const ActiveTenantContext = createContext();



export const ActiveTenantContextProvider = (props) => {
    
    const [activeTenant,setActiveTenant]=React.useState({});
    
    return (
    <ActiveTenantContext.Provider value={{activeTenant,setActiveTenant}}>
        {props.children}
    </ActiveTenantContext.Provider>
    )
}



export const ActiveTenantContextConsumer = ActiveTenantContext.Consumer;
export default ActiveTenantContext;