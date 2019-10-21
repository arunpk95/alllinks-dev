

import React from 'react';
import ReactDOM from 'react-dom';
import TopNav from './components/admin/home/topnav'
import LeftNav from './components/admin/home/leftnav'
import Center from './components/admin/home/center'

function Main() {
    return (
        <div>
            <TopNav />
            <div className="columns">
                <LeftNav />
                <Center />
            </div>
        </div>
    )
}

ReactDOM.render(<Main />, document.getElementById('app'));