import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {selectRooms, closeChat} from "../../redux/chatSlice"
import ChatWindow from '../ChatWindow/ChatWindow';

import "./ChatContainer.css"

function ChatContainer({user}) {
    const dispatch= useDispatch();
    const chatRooms= useSelector(selectRooms);
    
    const closeChatWindow = (roomName)=>{
        return dispatch(closeChat(roomName))
    }


    return (
        <div className="chatContainer__chatWindwos">
            {chatRooms.map((room,i) =><ChatWindow key={i} roomName={room} user={user} closeChatWindow={closeChatWindow}  />)}
        </div>
    )
}

export default ChatContainer
