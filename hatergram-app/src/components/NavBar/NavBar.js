import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import CreatePost from '../CreatePost/CreatePost'
import Logout from "../../components/Logout/Logout"

import "./NavBar.css"

import logo from "../../static/images/logo.png"

function NavBar({user}) {
    // let root= document.documentElement
    // const [dark, setDark]= useState(false)
    // let colorChange = ()=>{
    //     {dark ? root.style.setProperty('--form-main-color', "black"):(root.style.setProperty('--form-main-color', "#acdbdf"))}
    //     setDark(prevMode => !prevMode)
    // }
    console.log(user)
    if(!user){
        return(
            <div className="navbar">
                {/* <button onClick={colorChange}>Color</button> */}
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
                <CreatePost className/>
                <Logout />
                <Link   to={`/users/${user.id}`}><img className="navbar__avatar" src={user.avatar} alt=""/></Link>
            </div>
        </div>
    )
}

export default NavBar
