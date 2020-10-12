import { useQuery } from '@apollo/client'
import React , {useEffect} from 'react'
import { NEW_MESSAGE, ROOM_MESSAGES } from '../../graphql/queries'
import ChatBubble from '../ChatBubble/ChatBubble'

import "./ChatWindow.css"

function ChatWindow({user, closeChatWindow, roomName}) {
    const {data, error, loading, subscribeToMore} = useQuery(ROOM_MESSAGES, {variables: {roomName: roomName}})
    const subscribeToMoreMessages= ()=>subscribeToMore({
        document: NEW_MESSAGE,
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            console.log(subscriptionData)
            console.log("Prev", prev)
            const newFeedItem = subscriptionData.data.newMessage;
            return Object.assign({}, prev, {
                roomMessages: {
                comments: [newFeedItem, prev.roomMessages]
              }
            })   
        }
    })
    
    useEffect(() => {
        subscribeToMoreMessages()
    }, [])
    


    
    return (
        <div className="chatwindow__container">
            <div className="chatwindow__header">
                <div>
                    <img src="" alt=""/>
                    <h3>username</h3>
                </div>
                <i onClick={()=> closeChatWindow(roomName)} className="fas fa-times"></i>
            </div>
            <div className="chatwindow__chatbox">
                {loading ? <div>Loading.. </div>: (data.roomMessages.map(message=> <ChatBubble user={user} message={message}/>))}
            </div>
            <input className="chatwindow__input" type="text" placeholder="Aa"/>
        </div>
        
    )
}

export default ChatWindow