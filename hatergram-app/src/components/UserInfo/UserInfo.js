import React from 'react'
import { useQuery } from "@apollo/client"

import InfoCard from '../InfoCard/InfoCard'
import { USER_BY_ID } from "../../graphql/queries"
import UserStats from '../UserStats/UserStats'
import UserGallery from '../UserGallery/UserGallery'

import "./UserInfo.css"

function UserInfo({user,match}) {
    console.log(match)
    const {loading, error, data}= useQuery(USER_BY_ID,{
        variables: {id: parseInt(match.params.id )}})
    if(loading){return <div>Loading...</div>}
    if(error){return <div>{error}</div>}
    if(data.userById){
        const { posts, followers, following } =data.userById
        return (
            <div className="userinfo">
                <div className="userinfo__container">
                    
                    <InfoCard
                     userById={data.userById}   
                     avatar={data.userById.avatar} 
                     matchId={match.params.id}
                     userId= {user ? user.id : null}
                     username={data.userById.username} 
                     followers={followers}
                    />
                    <UserStats posts={posts} followers={followers} following={following} />
        
                </div>
                <div className="userinfo__gallery">
                       {posts.map( post =>{
                           return <UserGallery key={post.id} image={post.image} />
                       }) }
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
