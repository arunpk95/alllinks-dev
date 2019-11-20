import React from 'react';
import ReactDOM from 'react-dom';
import LeftNav from './components/admin/home/leftnav'
import Center from './components/admin/home/center'
import ActiveTenantContext, { ActiveTenantContextProvider } from './components/admin/contexts/activeTenantContext'
import TopNav from './components/admin/home/topnav'

function Main() {

    const [activeCenterItem,setActiveCenterItem] = React.useState('');
    const [uniqueCount,setUniqueCount] = React.useState(0);
    

    function changeCenterContent(centerItem)
    {
        setUniqueCount((curr)=>{return curr+1})
        setActiveCenterItem(centerItem);
    }

    return (

            <ActiveTenantContextProvider>
                <div>
                    
            <TopNav />
                    <div className="columns is-gapless is-multiline">
                        <LeftNav 
                        changeCenterContent={changeCenterContent}
                        activeCenterItem = {activeCenterItem} />
                        <Center
                        key={uniqueCount}
                        activeCenterItem = {activeCenterItem}  />
                    </div>
                </div>
            </ActiveTenantContextProvider>
    )
}

ReactDOM.render(<Main />, document.getElementById('app'));