import React from 'react'

import "./ChatBubble.css"

function ChatBubble({user, message}) {

    return (
        <div className="chatbubble__container">
            <div className={user.id === message.userId ? "chatbubble__currentUser" : "chatbubble__otherUser"}>
                {message.message}
            </div>
            
        </div>
    )
}

export default ChatBubble
