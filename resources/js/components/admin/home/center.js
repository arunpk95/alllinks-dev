import React from 'react';
import LinkService from '../../helpers/services/linkServices'
import TopNav from './topnav'
import Contact from './contact'
import activeTenantContext, { ActiveTenantContextConsumer } from '../contexts/activeTenantContext'

export default function center(props) {

    const tenantActive = activeTenantContext.activeTenant ? activeTenantContext.activeTenant : false;

    return (
            <div className="column is-7 is-main-content">
                {props.activeCenterItem}

                dsajkfnsad fjaksdnfakjsdnfkjasndfkjsankfd asfdnakjsfdkjnsadksankdSECTION
A SIMPLE CONTAINER TO DIVIDE YOUR PAGE INTO SECTIONS, LIKE THE ONE YOU'RE CURRENTLY READINGSECTION
A SIMPLE CONTAINER TO DIVIDE YOUR PAGE INTO SECTIONS, LIKE THE ONE YOU'RE CURRENTLY READINGSECTION
A SIMPLE CONTAINER TO DIVIDE YOUR PAGE INTO SECTIONS, LIKE THE ONE YOU'RE CURRENTLY READINGSECTION
A SIMPLE CONTAINER TO DIVIDE YOUR PAGE INTO SECTIONS, LIKE THE ONE YOU'RE CURRENTLY READINGSECTION
A SIMPLE CONTAINER TO DIVIDE YOUR PAGE INTO SECTIONS, LIKE THE ONE YOU'RE CURRENTLY READINGSECTION
A SIMPLE CONTAINER TO DIVIDE YOUR PAGE INTO SECTIONS, LIKE THE ONE YOU'RE CURRENTLY READINGSECTION
A SIMPLE CONTAINER TO DIVIDE YOUR PAGE INTO SECTIONS, LIKE THE ONE YOU'RE CURRENTLY READING
            </div>
    )

}