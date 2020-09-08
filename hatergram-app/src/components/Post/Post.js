import React from 'react'
import defaultAvatar from "../../static/icons/user.png"
import "./Post.css"
import SocialButtons from '../SocialButtons/SocialButtons'


function Post({caption, image, username, avatar, hates, postId }) {
    return (
        <div className="post__container">
            <div className="post__header">
                <div>
                    <img className="post__avatar" src={avatar ? avatar : defaultAvatar} alt=""/>
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
