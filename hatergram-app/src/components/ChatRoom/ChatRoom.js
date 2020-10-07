import React, {useState} from 'react'
import ChatWindow from '../ChatWindow/ChatWindow'

import "./ChatRoom.css"

function ChatRoom({room, user}) {
    const { firstUserInfo, secondUserInfo, messages}= room
    const [chat, setChat]= useState([])
    const openChat = ()=>{
        if(chat.includes(room.name)){
            return
        }else{
            setChat(prevChat=> [...prevChat, room.name])
        }
    }
    return (
        <>
        {firstUserInfo.id=== user.id ?
            <div onClick={openChat} className="chatroom__container">
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
            <div onClick={openChat} className="chatroom__container">
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

        {chat.map((res,i) => {
            console.log(res)
            return <ChatWindow key={i} roomName={res}/>
        })}
    </>        
    )
}

export default ChatRoom
