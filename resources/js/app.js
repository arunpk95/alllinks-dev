

import React from 'react';
import ReactDOM from 'react-dom';
import LeftNav from './components/admin/home/leftnav'
import Center from './components/admin/home/center'
import ActiveTenantContext, { ActiveTenantContextProvider } from './components/admin/contexts/activeTenantContext'
import TopNav from './components/admin/home/topnav'

function Main() {

    const [activeCenterItem,setActiveCenterItem] = React.useState('');
    
    function changeCenterContent(centerItem)
    {
        setActiveCenterItem(centerItem);
    }



    return (

            <ActiveTenantContextProvider>
                <div>
                    
            <TopNav />
                    <div className="columns is-fullheight is-gapless is-multiline is-mobile">
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