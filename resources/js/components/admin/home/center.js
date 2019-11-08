import React from 'react';
import LinkService from '../../helpers/services/linkServices'
import TopNav from './topnav'
import Contact from './contact'
import activeTenantContext, { ActiveTenantContextConsumer } from '../contexts/activeTenantContext'
import Links from './centercomponents/links/index'

export default function center(props) {

    const tenantActive = activeTenantContext.activeTenant ? activeTenantContext.activeTenant : false;

    


    return (
        <div className="column is-7 has-text-centered">
            <div className="container is-fluid" style={{ "paddingLeft": "15%", "paddingRight": "15%", "paddingTop": "30px", "paddingBottom": "100px" }}>
                {
                    props.activeCenterItem === 'links' ?
                        <Links/>
                        : ''
                }

            </div>
        </div >
    )

}