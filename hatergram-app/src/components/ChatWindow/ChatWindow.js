import { useQuery , useMutation} from '@apollo/client'
import ReactDOM from "react-dom"
import React , {useEffect, useCallback, useRef, useState} from 'react'
import { CHAT_ROOM_BY_NAME, NEW_MESSAGE, ROOM_MESSAGES } from '../../graphql/queries'
import ChatBubble from '../ChatBubble/ChatBubble'

import "./ChatWindow.css"
import { ADD_MESSAGE } from '../../graphql/mutations'

function ChatWindow({user, closeChatWindow, roomName}) {
    const {data: data2, loading: loading2}=useQuery(CHAT_ROOM_BY_NAME, {variables:{chatRoomName: roomName}})
    const {data, loading, subscribeToMore} = useQuery(ROOM_MESSAGES, {variables: {roomName: roomName}})
    const [message, setMessage]= useState("")
    const secondUser = loading2 ? null: data2.chatRoomByName.secondUserInfo.username
    const secondUserId = loading2 ? null: data2.chatRoomByName.secondUserInfo.id
    const firstUser = loading2 ? null: data2.chatRoomByName.firstUserInfo.username
    const firstUserId =loading2 ? null: data2.chatRoomByName.firstUserInfo.id
    const avatar = loading2 ? null: (user.id === secondUserId ?  data2.chatRoomByName.firstUserInfo.avatar : data2.chatRoomByName.secondUserInfo.avatar )
    const chatBox= useRef()

    const [addMessage] = useMutation(ADD_MESSAGE,{
        variables: {
           secondUser: user.id === secondUserId ? firstUser : secondUser,
           secondUserid: user.id === secondUserId ? firstUserId : secondUserId,
           message: message
        }
    })

    const submitMessage= (e)=>{
        if( e.key === "Enter"){
            
            addMessage()
            setMessage("")
        }
    }
    const subscribeToMoreMessages= useCallback(()=>subscribeToMore({
        document: NEW_MESSAGE,
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            console.log(subscriptionData)
            console.log("Prev", prev)
            const newFeedItem = subscriptionData.data.newMessage;
            return Object.assign({}, prev, {
                roomMessages: {
                message: [newFeedItem, prev]
              }
            })   
        }
    }),[subscribeToMore])
    
    useEffect(() => {
        console.log("subscribe")
        let unsubscribe;
        unsubscribe =subscribeToMoreMessages()
        return()=> {
            console.log("unsubscribe")    
            unsubscribe()
        }
    }, [subscribeToMoreMessages])
            
    
    useEffect(()=>{
        const node = ReactDOM.findDOMNode(chatBox.current)
        node.scrollTop = node.scrollHeight
    })

    return (
        <div className="chatwindow__container">
            <div className="chatwindow__header">
                <div>
                    <img src={avatar} alt=""/>
                    <h3>{user.id === secondUserId ? firstUser: secondUser}</h3>
                </div>
                <i onClick={()=> closeChatWindow(roomName)} className="fas fa-times"></i>
            </div>
            <div ref={chatBox} className="chatwindow__chatbox">
                {loading ? <div>Loading.. </div>: (data.roomMessages.map(message=> <ChatBubble key={message.id} user={user} message={message}/>))}
            </div>
            <input onKeyPress={submitMessage}  onChange={(e)=>setMessage(e.target.value)} value={message} className="chatwindow__input" type="text" placeholder="Aa"/>
        </div>
        
    )
}

export default ChatWindow