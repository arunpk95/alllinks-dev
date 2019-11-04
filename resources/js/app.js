

import React from 'react';
import ReactDOM from 'react-dom';
import LeftNav from './components/admin/home/leftnav'
import Center from './components/admin/home/center'
import ActiveTenantContext, { ActiveTenantContextProvider } from './components/admin/contexts/activeTenantContext'

function Main() {

    const [activeCenterItem,setActiveCenterItem] = React.useState('');
    
    function changeCenterContent(centerItem)
    {
        setActiveCenterItem(centerItem);
    }



    return (

            <ActiveTenantContextProvider>
                <div>
                    <div className="columns is-fullheight is-gapless">
                        <LeftNav 
                        changeCenterContent={changeCenterContent}
                        activeCenterItem = {activeCenterItem} />
                        <Center
                        activeCenterItem = {activeCenterItem}  />
                    </div>
                </div>
            </ActiveTenantContextProvider>
    )
}

ReactDOM.render(<Main />, document.getElementById('app'));