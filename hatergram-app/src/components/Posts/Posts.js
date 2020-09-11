import React from 'react'
import Post from "../Post/Post"
import { useQuery } from "@apollo/client"
import {POSTS, POSTS_BY_ID} from "../../graphql/queries"




function Posts({user, query}) {
    const {loading, error, data} = useQuery(query)
    
    if(error){return alert(error)}
    if(loading){return <div>Loading...</div>}
    if(data && query === POSTS){
        
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
    }
    if(data && query === POSTS_BY_ID){
        console.log(data)
        return (
            data.postsById.map((posts)=>
                    posts.posts.map( (post, index) =>{
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
        )
    }
    
    
    else{ return <h1>Loading...</h1> }
}

export default Posts
