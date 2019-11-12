import React from 'react'
import Settings from './settings'
export default function loadingIcon() {
    const style = {"height":"40px"};
    const [settings] = React.useState(new Settings);

    return (
        <div className="field" >
            <img style={style} src={settings.homeURL+"images/flatloader.svg" }/>
        </div>
    )
}