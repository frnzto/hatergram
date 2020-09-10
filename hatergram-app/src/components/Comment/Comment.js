import React from 'react'
import defaultAvatar from "../../static/icons/user.png"
import {createdAt} from "../../functions/helperFunctions"
import "./Comment.css"

function Comment({ comment }) {
    const {username, avatar}= comment.user
    return (
        <div className="comment__container">
            <div className="comment__wrapper">
                <img src={avatar || defaultAvatar} alt=""/>
                <div className="comment__bubble">
                    <div className="comment__username">{username}</div>
                    <div className="comment__comment">{comment.comment}</div>
                </div>
            </div>
            <p>{createdAt(+comment.createdAt)}</p>
        </div>
    )
}

export default Comment
