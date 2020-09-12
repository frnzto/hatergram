import React from 'react'
import { useMutation} from '@apollo/client'

import { USER } from "../../graphql/queries"
import { LOGOUT } from "../../graphql/mutations"

import "./Logout.css"

function Logout() {
    const [logout]= useMutation(LOGOUT)

    const handleLogout = (e)=>{
        e.preventDefault()
        logout({refetchQueries:[{query: USER}]})
    }

    return (
        <div>
            <button className="logout__button" onClick={handleLogout}>LogOut</button>
        </div>
    )
}

export default Logout