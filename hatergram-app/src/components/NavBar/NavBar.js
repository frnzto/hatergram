import React from 'react'
import {Link} from 'react-router-dom'

import logo from "../../static/images/logo.png"
import defaultAvatar from "../../static/icons/user.png"
import Messages from "../Messages/Messages"
import CreatePost from '../CreatePost/CreatePost'
import Logout from "../../components/Logout/Logout"
import DarkModeToggler from "../DarkModeToggler/DarkModeToggler"

import "./NavBar.css"

function NavBar({user}) {
    
    if(!user){
        return(
            <div className="navbar">
                <Link to="/dashboard">
                    <img className="navbar__img" src={logo} alt=""/>
                </Link>
                <div className="navbar__links">
                    <Link id="link" to="/login"><span>Log In</span></Link>
                    <Link id="link" to="/signup"><span>SignUp</span></Link>
                </div>
            </div>
        )
    }
    return (
        <div className="navbar">
            <Link to="/dashboard">
                <img className="navbar__img" src={logo} alt=""/>
            </Link>
            <div className="navbar__links">
                <CreatePost className userId={user.id} username={user.username}/>
                <Messages user={user}/>
                <Logout />
                <Link   to={`/users/${user.id}`}><img className="navbar__avatar" src={user.avatar || defaultAvatar} alt="" title={user.username}/></Link>
            </div>
        </div>
    )
}

export default NavBar
