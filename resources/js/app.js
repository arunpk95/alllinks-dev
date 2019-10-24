

import React from 'react';
import ReactDOM from 'react-dom';
import LeftNav from './components/admin/home/leftnav'
import Center from './components/admin/home/center'

function Main() {
    
    return (
        <div>
        <div className="columns is-fullheight is-gapless">
                <LeftNav />
                <Center />
            </div>
        </div>
    )
}

ReactDOM.render(<Main />, document.getElementById('app'));