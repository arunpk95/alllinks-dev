import React from 'react'
import activeTenantContext, { ActiveTenantContextConsumer } from '../../contexts/activeTenantContext'


export default function centerHeader(props) {
    const activeTenant = React.useContext(activeTenantContext).activeTenant;
    
    return (
        <center>
            <div className="avatar-upload-title" style={{ "float": "center" }}>
                <div className="avatar-preview-title">
                    <div style={{ "backgroundImage": "url('"+activeTenant.thumb_image_url+"')" }}>
                    </div>
                </div>
            </div>
            <p className="center">{activeTenant.tenant_text}</p>
        </center>
    )
}