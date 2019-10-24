import React from 'react'
export default function loadingIcon() {
    const style = {"height":"40px"};

    return (
        <div className="field" >
            <img style={style} src="http://127.0.0.1:8000/images/flatloader.svg" />
        </div>
    )
}