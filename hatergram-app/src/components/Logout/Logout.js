import React from 'react'
import { gql, useMutation} from '@apollo/client'

const LOGOUT = gql`
    mutation Logout{
        logout{
            email
        }
    }
`

function Logout() {
    const [logout]= useMutation(LOGOUT)

    const handleLogout = (e)=>{
        e.preventDefault()

        logout()
    }

    return (
        <div>
            <button onClick={handleLogout}>LogOut</button>
        </div>
    )
}

export default Logout