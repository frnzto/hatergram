import React, { useState } from 'react'
import InfoCard from '../InfoCard/InfoCard'
import { useQuery } from "@apollo/client"
import { USER_BY_ID } from "../../graphql/queries"
import "./UserInfo.css"
import UserStats from '../UserStats/UserStats'
import UserGallery from '../UserGallery/UserGallery'

function UserInfo({user,match}) {
    const [refresh , setRefresh] = useState(false)
    const {loading, error, data}= useQuery(USER_BY_ID,{
        variables: {id: parseInt(match.params.id )}})
    if(loading){return <div>Loading...</div>}
    if(data.userById){
        const { posts } =data.userById
        return (
            <div className="userinfo">
                <div className="userinfo__container">
                    
                    <InfoCard
                        
                     avatar={data.userById.avatar} 
                     matchId={match.params.id}
                     userId= {user ? user.id : null}
                     username={data.userById.username} 
                    />
                    <UserStats />
        
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