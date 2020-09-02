import {gql} from "@apollo/client"

export const LOGOUT = gql`
    mutation Logout{
        logout{
            email
        }
    }
`

export const USER_UPDATE = gql`
    mutation User_Update($avatar: String){
        userUpdate(avatar: $avatar){
            email
            avatar
        }
    }
`