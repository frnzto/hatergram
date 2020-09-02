import React from 'react'
import {Link} from 'react-router-dom'
import CreatePost from '../CreatePost/CreatePost'
import Logout from "../../components/Logout/Logout"

import "./NavBar.css"

import logo from "../../static/images/logo.png"

function NavBar({user}) {
    console.log(user)
    if(!user){
        return(
            <div className="navbar">
                <Link to="/posts">
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
            <Link to="/posts">
                <img className="navbar__img" src={logo} alt=""/>
            </Link>
            <div className="navbar__links">
                <Logout />
                <CreatePost className/>
                <Link id="link" to={`/users/${user.id}`}>{user.username}</Link>
            </div>
        </div>
    )
}

export default NavBar
