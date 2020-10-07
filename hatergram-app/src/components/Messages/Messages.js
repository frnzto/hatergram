import { useLazyQuery } from '@apollo/client'
import React , { useRef } from 'react'
import ReactDOM from "react-dom"
import { CHAT_ROOMS } from '../../graphql/queries'
import ChatRoom from '../ChatRoom/ChatRoom'
import ChatWindow from '../ChatWindow/ChatWindow'

import "./Messages.css"

function Messages({user}) {
    const messagesRef = useRef()
    const [chatRooms,{loading, error, data}] = useLazyQuery(CHAT_ROOMS)
    const toggleMessages = ()=>{
        const node= ReactDOM.findDOMNode(messagesRef.current)
        node.classList.toggle("messages__hide")
    }
    
    return (
        <>
            <div className="messages__container">
                <i onClick={()=>{toggleMessages(); chatRooms()}} id="messages__button" className="far fa-envelope"></i>
                
                    {!data ? 
                            <div ref={messagesRef} className="messages__wrap messages__hide">
                                    <div>loading</div>
                            </div> 
                    :   
                            <div ref={messagesRef} className="messages__wrap messages__hide">
                                {data.chatRooms.map( room => {
                                    return <ChatRoom key={room.id} user={user} room={room}/>
                                })}
                            </div>
                    }
                    
            </div>
        
            {/* <ChatWindow /> */}
        </>
    )
}

export default Messages
