import React from 'react';
import LinkService from '../../helpers/services/linkServices'
import TopNav from './topnav'
import Contact from './contact'
import activeTenantContext, { ActiveTenantContextConsumer } from '../contexts/activeTenantContext'

export default function center(props) {

    const tenantActive = activeTenantContext.activeTenant ? activeTenantContext.activeTenant : false;

    return (
        <div className="column is-main-content">
            <TopNav />
            <div className="columns is-fullheight">
                <div className="column is-6">

                    {props.activeCenterItem}

                </div>
            </div>
        </div>
    )

}