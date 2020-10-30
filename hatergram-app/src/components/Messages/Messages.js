import { useLazyQuery } from '@apollo/client'
import React , { useRef } from 'react'
import ReactDOM from "react-dom"
import { CHAT_ROOMS } from '../../graphql/queries'
import ChatRoom from '../ChatRoom/ChatRoom'
import { useDispatch} from "react-redux"
import {openChat} from "../../redux/chatSlice"


import "./Messages.css"

function Messages({user}) {
    const dispatch= useDispatch()
    const messagesRef = useRef()
    const [chatRooms,{data}] = useLazyQuery(CHAT_ROOMS)
    const toggleMessages = ()=>{
        const node= ReactDOM.findDOMNode(messagesRef.current)
        node.classList.toggle("messages__hide")
    }

    const openChatWindow =(roomName)=>{
        const node= ReactDOM.findDOMNode(messagesRef.current)
        node.classList.toggle("messages__hide")
            return dispatch(openChat(roomName))

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
                                        <ChatRoom  user={user} room={room}/>
                                </div>)
                                
                            })}
                        </div>
                }
        </div>
    )
}

export default Messages
