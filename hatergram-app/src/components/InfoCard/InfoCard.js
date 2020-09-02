import React from 'react'
import avatarDefault from "../../static/icons/user.png"

import "./InfoCard.css"
import UserSettings from '../UserSettings/UserSettings'

function InfoCard({matchId, userId, avatar, username}) {
    return (
        <div className="infocard__wrapper">
            <div className="infocard__avatar-name">
                <img className="infocard__avatar" src={avatar || avatarDefault} alt=""/>
                <h2>{username}</h2>
            </div>
            <div className="infocard__about">
                <h1>About me</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla sit, omnis quod inventore voluptate quia libero possimus aliquid molestias, repellat provident dignissimos explicabo impedit modi, debitis similique. Minima, fuga minus!</p>
            </div>
            {+matchId === userId ? <UserSettings avatar={avatar} matchId={matchId}/>: null}
            
        </div>
    )
}

export default InfoCard
