import React from 'react'

import "./ChatRoom.css"

function ChatRoom({room, user,}) {
    const { firstUserInfo, secondUserInfo, messages}= room
    
    return (
        <>
        {firstUserInfo.id=== user.id ?
            <div className="chatroom__container">
                <img className="chatroom__avatar" src={secondUserInfo.avatar} alt=""/>
                        <div className="chatroom__username_message">
                            <span className="chatroom__username">{secondUserInfo.username}</span>
                            {messages[messages.length -1].userId === user.id ?
                                <span>You: {messages[messages.length -1 ].message}</span>
                                :
                                <span>{messages[messages.length -1 ].message}</span>
                            }
                        </div>   
            </div>
        :
            <div className="chatroom__container">
                <img className="chatroom__avatar" src={firstUserInfo.avatar} alt=""/>
                    <div className="chatroom__username_message">
                        <span className="chatroom__username">{firstUserInfo.username}</span>
                        {messages[messages.length -1].userId === user.id ?
                            <span>You: {messages[messages.length -1 ].message}</span>
                            :
                            <span>{messages[messages.length -1 ].message}</span>
                        }
                    </div>   
            </div>
        }
        </>        
    )
}

export default ChatRoom
