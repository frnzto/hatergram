import React from 'react'
import avatar from "../../static/icons/user.png"
import "./Post.css"
function Post() {
    return (
        <div className="post__container">
            <div className="post__header">
                <img className="post__avatar" src={avatar} alt=""/>
                <h3>Username</h3>
                <h2>Caption</h2>
            </div>
            <img className="post__image" src="https://images3.alphacoders.com/954/thumb-1920-954241.jpg" alt=""/>
            <div className="post__buttons">
                <button id="post__button">Hate</button>
                <button id="post__button">Like</button>
                <button id="post__button">Comment</button>
            </div>
            <div className="post__buttons">

            </div>
        </div>
    )
}

export default Post
