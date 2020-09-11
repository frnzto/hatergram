import React from 'react'
import avatarDefault from "../../static/icons/user.png"

import "./InfoCard.css"
import UserSettings from '../UserSettings/UserSettings'
import Button from '../Button/Button'
import { FOLLOW_UNFOLLOW } from '../../graphql/mutations'
import { gql, useMutation } from '@apollo/client'

function InfoCard({matchId, userId, avatar, username,userById, followers}) {
    const[followUnfollow] = useMutation(FOLLOW_UNFOLLOW,{
        update(cache, {data: {followUnfollow} }){
            cache.modify({
                fields:{
                    userById(existingUserById = []){
                        const newFolloerRef = cache.writeFragment({
                            data: followUnfollow,
                            variables: {id: matchId},
                            fragment: gql`
                                fragment newFollower on User_By_Id {
                                    following{
                                        id
                                        followed
                                        followedName{
                                            id
                                            username
                                        }
                                    }
                                    followers{
                                        id
                                        follower
                                        followerName{
                                            id
                                            username
                                        }
                                    }
                                }
                            `
                        })
                        return[ existingUserById, newFolloerRef]
                    }
                }
            })
        }
    })
    
    const checkIfFollow = followers.filter(follower=>follower.follower === userId)
    const handleFollow= ()=>{
        followUnfollow({variables:{followed: +matchId}})
    }
    return (
        <div className="infocard__wrapper">
            <div className="infocard__avatar-name">
                <img className="infocard__avatar" src={avatar || avatarDefault} alt=""/>
                <h2>{username}</h2>
                {+matchId === userId || !userId ? null
                    :
                    ( 
                        userId && checkIfFollow.length> 0
                        ?
                        <Button onClickFunc = {handleFollow} value='following' cssStyle="btn__follow" matchId={+matchId}/>
                        : 
                        <Button onClickFunc = {handleFollow} value='follow' cssStyle="btn__follow" matchId={+matchId}/>
                    )
                }
                
            </div>
            <div className="infocard__about">
                <h1>About me</h1>
                <p>{userById.info}</p>
            </div>
            {+matchId === userId ? <UserSettings username={username} avatar={avatar} matchId={matchId}/>: null}
        </div>
    )
}

export default InfoCard
