import React from 'react'
import defaultAvatar from "../../static/icons/user.png"
import "./Post.css"
import SocialButtons from '../SocialButtons/SocialButtons'
import Comment from "../Comment/Comment"
import {DELETE_POST, HATES_DELETE, COMMENTS_DELETE} from '../../graphql/mutations'
import { useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'
import { storage } from "../../firebase"
import CreateComment from '../CreateComment/CreateComment'




function Post({caption, image, username, postAvatar, userAvatar, hates, postId, currentUser, postOwner,comments }) {
    
    const [hatesDelete]= useMutation(HATES_DELETE)
    const [commentsDelete]= useMutation(COMMENTS_DELETE)
    const [deletePost]=useMutation(DELETE_POST,{
        update(cache) {
            cache.modify({
                fields:{
                    posts(existingPosts, {DELETE}){
                        return DELETE  
                    },
                    userById(existingUser, {DELETE}){
                        return DELETE
                    }
                }
            })
        }
    })

    const handleDelete = async()=>{
        const imageUrl = image
        await storage.refFromURL(imageUrl).delete()
        deletePost({variables : {id: postId} })
        commentsDelete({variables: {postId} })
        hatesDelete({variables: {postId} })
    }
    
    return (
        <div className="post__container">
            <div className="post__header">
                { currentUser.id === postOwner.id ? <i onClick={handleDelete} className="fas fa-trash-alt post__delete"></i> : null}
                
                <div>
                   <Link to={`/users/${postOwner.id}`}><img className="post__avatar" src={postAvatar ? postAvatar : defaultAvatar} alt=""/></Link> 
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
                <CreateComment userAvatar={userAvatar} postId={postId} defaultAvatar={defaultAvatar}/>
                <div className="post__comments_bubble">
                    {comments.map((comment, index)=>
                        <Comment key={index} comment={comment}/>    
                    )}
                </div>

            </div>
        </div>
    )
}

export default Post
