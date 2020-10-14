import { useLazyQuery } from '@apollo/client'
import React , { useRef, useState } from 'react'
import ReactDOM from "react-dom"
import { CHAT_ROOMS } from '../../graphql/queries'
import ChatRoom from '../ChatRoom/ChatRoom'
import ChatWindow from '../ChatWindow/ChatWindow'

import "./Messages.css"

function Messages({user}) {
    const messagesRef = useRef()
    const [chatRooms,{data}] = useLazyQuery(CHAT_ROOMS)
    const [chat, setChat]= useState([])
    const toggleMessages = ()=>{
        const node= ReactDOM.findDOMNode(messagesRef.current)
        node.classList.toggle("messages__hide")
    }

    const openChatWindow =(roomName)=>{
        if(chat.includes(roomName)){
            return 
        }else{
            return setChat(prev=> [...prev, roomName])
        }

    }

    const closeChatWindow = (roomName)=>{
        
        const newChatArr= chat.filter(res => !res === roomName)
        return setChat(newChatArr)
        
    }

    return (
        <div className="messages__container">
            <i onClick={()=>{toggleMessages(); chatRooms()}} id="messages__button" className="far fa-envelope"></i>
            
                {!data ? 
                        <div ref={messagesRef} className="messages__wrap messages__hide">
                                <div>loading</div>
                        </div> 
                :   
                        <div ref={messagesRef} className="messages__wrap messages__hide">
                            {data.chatRooms.map( room => {
                                return (<div  key={room.id} onClick={()=>openChatWindow(room.name)}>
                                        <ChatRoom setChat={setChat}  user={user} room={room}/>
                                </div>)
                                
                            })}
                        </div>
                }
               
            {chat.map((res, i)=> <ChatWindow  user={user} key={i}roomName={res} closeChatWindow={closeChatWindow}/>)}
        </div>
    )
}

export default Messages
