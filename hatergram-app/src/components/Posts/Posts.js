import React from 'react'
import Post from "../Post/Post"
import { useQuery } from "@apollo/client"
import {POSTS} from "../../graphql/queries"



function Posts({user}) {
    const {loading, error, data} = useQuery(POSTS)
    
    if(error){return alert(error)}
    if(loading){return <div>Loading...</div>}
    if(data){
        return (
            data.posts.map((post, index)=>{
                
                return <Post 
                    key={index}
                    caption={post.caption}
                    image={post.image}
                    username={post.user.username}
                    userAvatar={user.avatar}
                    postAvatar={post.user.avatar}
                    hates= { post.hates ? post.hates : [] }
                    postId={post.id}
                    postOwner={post.user}
                    currentUser={user}
                    comments= {post.comments}
                />
            })
        )
    }else{ return <h1>Loading...</h1> }
}

export default Posts
