import React from 'react'
import { gql, useMutation } from '@apollo/client'
import {useDispatch} from "react-redux"
import avatarDefault from "../../static/icons/user.png"
import UserSettings from '../UserSettings/UserSettings'
import Button from '../Button/Button'
import { FOLLOW_UNFOLLOW } from '../../graphql/mutations'
import { followUnfollowCacheUpdate } from '../../graphql/cacheUpdate'
import { openChat} from "../../redux/chatSlice"

import "./InfoCard.css"

function InfoCard({matchId, user,  userId, avatar, username,userById, followers}) {
    const[followUnfollow] = useMutation(FOLLOW_UNFOLLOW,followUnfollowCacheUpdate({gql, matchId}))
    const dispatch= useDispatch()
    const checkIfFollow = followers.filter(follower=>follower.follower === userId)
    const roomName = [username, user.username].sort().join("").replace(/\s+/g, '')

    const handleFollow= ()=>{
        followUnfollow({variables:{followed: +matchId}})
    }

    const openChatFunc= () =>{
        return dispatch(openChat(roomName))
    }

    return (
        <>
            <div className="infocard__container">
                <div className="infocard__wrapper">
                    <div className="infocard__avatar-name">
                        <img className="infocard__avatar" src={avatar || avatarDefault} alt=""/>
                        <h2>{username}</h2>
                    </div>
                    <div className="infocard__about">
                        <h1>About me</h1>
                        <p>{userById.info}</p>
                    </div>
                    {+matchId === userId ? <UserSettings username={username} avatar={avatar} matchId={matchId}/>: null}
                </div>
                <div>
                    {+matchId === userId || !userId ? null
                        :
                        ( 
                            userId && checkIfFollow.length> 0
                            ?
                            <div className="infocard__buttons">
                                <Button onClickFunc = {handleFollow} value='following' cssStyle="btn__follow" matchId={+matchId}/>
                                <Button onClickFunc = {openChatFunc} value="message" cssStyle="btn__follow "/>
                            </div>
                            :
                            <div className="infocard__buttons">
                                <Button onClickFunc = {handleFollow} value='follow' cssStyle="btn__follow" matchId={+matchId}/>
                                <Button onClickFunc = {openChatFunc} value="message" cssStyle="btn__follow"/>
                            </div> 
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default InfoCard
