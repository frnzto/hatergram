import React from 'react'

import "./ChatWindow.css"

function ChatWindow() {
    return (
        <div className="chatwindow__container">
            <div className="chatwindow__header">
                <div>
                    <img src="" alt=""/>
                    <h3>username</h3>
                </div>
                <i class="fas fa-times"></i>
            </div>
            <div className="chatwindow__chatbox">
                
            </div>
            <input className="chatwindow__input" type="text" placeholder="Aa"/>
        </div>
        
    )
}

export default ChatWindow
