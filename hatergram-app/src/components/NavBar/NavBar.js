import React from 'react'
import {Link} from 'react-router-dom'

import "./NavBar.css"

import logo from "../../static/images/logo.png"
function NavBar() {
    return (
        <div className="navbar">
            <img className="navbar__img" src={logo} alt=""/>
            <div className="navbar__links">
                <Link id="link" to="/login"><span>Log In</span></Link>
                <Link id="link" to="/signup"><span>SignUp</span></Link>
            </div>
        </div>
    )
}

export default NavBar
