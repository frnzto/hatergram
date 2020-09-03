import React from 'react'
import avatarDefault from "../../static/icons/user.png"

import "./InfoCard.css"
import UserSettings from '../UserSettings/UserSettings'

function InfoCard({matchId, userId, avatar, username,userById}) {
    return (
        <div className="infocard__wrapper">
            <div className="infocard__avatar-name">
                <img className="infocard__avatar" src={avatar || avatarDefault} alt=""/>
                <h2>{username}</h2>
            </div>
            <div className="infocard__about">
                <h1>About me</h1>
                <p>{userById.info}</p>
            </div>
            {+matchId === userId ? <UserSettings avatar={avatar} matchId={matchId}/>: null}
            
        </div>
    )
}

export default InfoCard
