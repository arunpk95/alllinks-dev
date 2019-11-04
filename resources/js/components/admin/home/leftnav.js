import React from 'react';
import SelectTenant from './selectTenant'
import ActiveTenantContext, { ActiveTenantContextConsumer } from '../contexts/activeTenantContext'

export default function leftNav(props) {

    const activeTenantContext = React.useContext(ActiveTenantContext)
    const tenantActive = activeTenantContext.activeTenant ? activeTenantContext.activeTenant : false;
    
    return (
        <div className="column is-2 is-sidebar-menu">
            <aside className="menu">
                <ul className="menu-list">
                    <SelectTenant 
                        changeCenterContent={props.changeCenterContent}/>
                    {//prevent loading link till tenant is selected
                        typeof tenantActive.tenant_name === "undefined" ?
                            '' : (<div>
                                <li><a onClick={()=>props.changeCenterContent('links')} className={props.activeCenterItem=="links"?"nav-is-active navbar-item":"navbar-item"} >
                                    <div style={{ "position": "relative", "padding": "15px" }}>
                                        <span><span style={{ "padding": "15px" }}><i className="fa fa-link"></i></span>Links</span>
                                    </div>
                                </a></li>

                                <li><a onClick={()=>props.changeCenterContent('analytics')} className={props.activeCenterItem=="analytics"?"nav-is-active navbar-item":"navbar-item"}   >
                                    <div style={{ "position": "relative", "padding": "15px" }}>
                                        <span><span style={{ "padding": "15px" }}><i className="fas fa-chart-line"></i></span>Analytics</span>
                                    </div>
                                </a></li>

                                <li><a onClick={()=>props.changeCenterContent('forms')}className={props.activeCenterItem=="forms"?"nav-is-active navbar-item":"navbar-item"}  >
                                    <div style={{ "position": "relative", "padding": "15px" }}>
                                        <span><span style={{ "padding": "15px" }}><i className="fab fa-wpforms"></i></span>Forms</span>
                                    </div>
                                </a></li>

                                <li><a onClick={()=>props.changeCenterContent('settings')} className={props.activeCenterItem=="settings"?"nav-is-active navbar-item":"navbar-item"}   >
                                    <div style={{ "position": "relative", "padding": "15px" }}>
                                        <span><span style={{ "padding": "15px" }}><i className="fa fa-cog"></i></span>Settings</span>
                                    </div>
                                </a></li>

                            </div>)
                    }
                </ul>
            </aside>
        </div>

    )

}

//from https://codepen.io/wikiki/pen/OjdNKM
/*<div className="column is-2 is-sidebar-menu is-hidden-mobile">
    <aside className="menu">
        <p className="menu-label">
        General
        </p>
        <ul className="menu-list">
        <li><a>Dashboard</a></li>
        <li><a>Customers</a></li>
        </ul>
        <p className="menu-label">
        Administration
        </p>
        <ul className="menu-list">
        <li><a>Team Settings</a></li>
        <li>
            <a className="is-active">Manage Your Team</a>
            <ul>
                <li><a>Members</a></li>
                <li><a>Plugins</a></li>
                <li><a>Add a member</a></li>
            </ul>
        </li>
        <li><a>Invitations</a></li>
        <li><a>Cloud Storage Environment Settings</a></li>
        <li><a>Authentication</a></li>
        </ul>
        <p className="menu-label">
        Transactions
        </p>
        <ul className="menu-list">
        <li><a>Payments</a></li>
        <li><a>Transfers</a></li>
        <li><a>Balance</a></li>
        </ul>
    </aside>
</div>
*/