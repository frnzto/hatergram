import React from 'react'
import defaultAvatar from "../../static/icons/user.png"
import "./Post.css"
import SocialButtons from '../SocialButtons/SocialButtons'
import {DELETE_POST} from '../../graphql/mutations'
import { useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'
import { storage } from "../../firebase"




function Post({caption, image, username, avatar, hates, postId, currentUser, postOwner }) {
    
    const [deletePost]=useMutation(DELETE_POST,{
        update(cache) {
            cache.modify({
                fields:{
                    posts(existingPosts, {DELETE}){
                        return DELETE  
                    }
                }
            })
        }
    })

    const handleDelete = async()=>{
        const imageUrl = image
        await storage.refFromURL(imageUrl).delete()
        deletePost({variables :{id: postId}})
    }
    
    return (
        <div className="post__container">
            <div className="post__header">
                { currentUser.id === postOwner.id ? <i onClick={handleDelete} className="fas fa-trash-alt post__delete"></i> : null}
                
                <div>
                   <Link to={`/users/${postOwner.id}`}><img className="post__avatar" src={avatar ? avatar : defaultAvatar} alt=""/></Link> 
                    <h3>{username}</h3>
                </div>
                <h2>{caption}</h2>
            </div>
            <div className="post__image_bg">
                <img className="post__image" src={image} alt=""/>
            </div>
            <div className="post__likesbox">
                <p>hates: {hates.length}</p>
                <p>comments</p>
            </div>
            <SocialButtons postId={postId} />
            <div className="post__comments">
                <div className="post__comments_create">
                    <img src={avatar ? avatar : defaultAvatar} alt="" className=""/>
                    <input type="text" placeholder="Write a comment..."/>
                </div>
                <div className="post__comments_bubble">
                    <img src={defaultAvatar} alt=""/>
                    <div className="post__comments_bubble-text">
                        <div>username</div>
                        <div>some random text</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Post
