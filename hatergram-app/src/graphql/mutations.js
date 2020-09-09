import {gql} from "@apollo/client"

export const LOGOUT = gql`
    mutation Logout{
        logout{
            id
            email
        }
    }
`

export const USER_UPDATE = gql`
    mutation User_Update($avatar: String, $info: String){
        userUpdate(avatar: $avatar, info: $info){
            id
            info
            avatar
        }
    }
`

export const HATES_ADD=gql`
    mutation Hates_Add($postId: Int){
        hatesAdd(postId: $postId){
            id
            postId
            
        }
    }
`

export const CREATE_POST = gql`
    mutation CreatePost($caption: String!, $image: String!){
        createPost(caption: $caption, image: $image){
            id
            userId
        }
    }
`

export const DELETE_POST = gql`
    mutation DeletePost($id: Int){
        deletePost(id: $id){
            id
        }
    }
`