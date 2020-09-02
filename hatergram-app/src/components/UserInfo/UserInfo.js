import React from 'react'
import avatarDefault from "../../static/icons/user.png"
import { useQuery } from "@apollo/client"
import { USER_BY_ID } from "../../graphql/queries"
import "./UserInfo.css"

function UserInfo({user,match}) {
    const {loading, error, data}= useQuery(USER_BY_ID,{
        variables: {id: parseInt(match.params.id)}})
    if(loading){return <div>Loading...</div>}
    if(data.userById){
        console.log(data)
        return (
            <div className="userinfo__container">
                <div className="userinfo__wrapper">
                    <div className="userinfo__avatar-name">
                        <img className="userinfo__avatar" src={data.userById.avatar || avatarDefault} alt=""/>
                        <h2>{data.userById.username}</h2>
                    </div>
                    <div className="userinfo__about">
                        <h1>About me</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla sit, omnis quod inventore voluptate quia libero possimus aliquid molestias, repellat provident dignissimos explicabo impedit modi, debitis similique. Minima, fuga minus!</p>
                    </div>
                </div>
                <div className="userinfo__stats">
                    <div>
                        <h1>0</h1>
                        <h1>POST</h1>
                    </div>
                    <div>
                        <h1>0</h1>
                        <h1>Hates</h1>
                    </div>
                    <div>
                        <h1>0</h1>
                        <h1>Likes</h1>
                    </div>
                </div>
    
            </div>
        )
    }
    if(data.userById === null )
    return(
        <h1>No such user</h1>
    )
}

export default UserInfo
