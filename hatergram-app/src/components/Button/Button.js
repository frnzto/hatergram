import React from 'react'
import "./Button.css"


function Button({onClickFunc, value, cssStyle}) {
    
    return (
        <div>
            <button onClick={onClickFunc} className={cssStyle}>{value}</button>
        </div>
    )
}

export default Button
