import React from 'react'

import "./UserGallery.css"

function UserGallery({image}) {
    return (
        <div>
            <img className="usergallery_img" src={image} alt=""/>
        </div>
    )
}

export default UserGallery
