import React from 'react'
import Post from "../Post/Post"
import { useQuery } from "@apollo/client"
import {POSTS} from "../../graphql/queries"



function Posts() {
    const {loading, error, data} = useQuery(POSTS)
    
    if(error){return alert(error)}
    if(loading){return <div>Loading...</div>}
    if(data){

        return (
            data.posts.map(post=>{
                
                return <Post 
                    key={post.id}
                    caption={post.caption}
                    image={post.image}
                    username={post.user.username}
                    avatar={post.user.avatar}
                    hates= { post.hates ? post.hates : [] }
                    postId={post.id}
    
                />
            })
        )
    }else{ return <h1>Loading...</h1> }
}

export default Posts
