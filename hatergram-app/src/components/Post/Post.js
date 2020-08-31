import React from 'react'
import avatar from "../../static/icons/user.png"
import "./Post.css"
function Post() {
    return (
        <div className="post__container">
            <div className="post__header">
                <div>
                    <img className="post__avatar" src={avatar} alt=""/>
                    <h3>Username</h3>
                </div>
                <h2>Caption</h2>
            </div>
            <img className="post__image" src="https://images3.alphacoders.com/954/thumb-1920-954241.jpg" alt=""/>
            <div className="post__likesbox">
                <p>likes</p>
                <p>comments</p>
            </div>
            <div className="post__buttons_container">
                <div className="post__buttons">
                    <button id="post__button">Hate</button>
                    <button id="post__button">Like</button>
                    <button id="post__button">Comment</button>
                </div>
            </div> 
            <div className="post__comments">
                <div className="post__comments_create">
                    <img src={avatar} alt="" className=""/>
                    <input type="text" placeholder="Write a comment..."/>
                </div>
                <div className="post__comments_bubble">
                    <img src={avatar} alt=""/>
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
