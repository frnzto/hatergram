import {gql} from "@apollo/client"

export const LOGOUT = gql`
    mutation Logout{
        logout{
            id
            email
        }
    }
`

export const LOGIN = gql`
mutation Login($email: String!, $password: String!){
    login(email: $email, password: $password){
        email
        id
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
            userId
            postId
        }
    }
`

export const HATES_DELETE= gql`
    mutation HatesDelete($postId: Int!){
        hatesDelete(postId: $postId){
            id
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

export const COMMENT_ADD = gql`
    mutation CommentAdd($postId: Int!, $comment: String!){
        commentAdd(postId: $postId, comment: $comment){
            id
            comment
            user{
                id
                username
            }
        }
    }
`

export const COMMENTS_DELETE = gql`
    mutation CommentsDelete($postId: Int!){
        commentsDelete(postId: $postId){
            id
            comment
        }
    }
`

export const FOLLOW_UNFOLLOW = gql`
    mutation FollowUnfollow($followed: Int!){
        followUnfollow(followed: $followed){
            id
        }
    }
`

export const FOLLOW_MYSELF = gql`
    mutation FollowMyself($followed: Int!, $follower: Int!){
        followMyself(followed: $followed, follower: $follower){
            id
        }
    }
`

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password){
        username
    }
}
`

export const ADD_MESSAGE = gql`
    mutation AddMessage($secondUser: String, $secondUserId: Int, $message: String){
        addMessage(secondUser: $secondUser, secondUserId: $secondUserId, message: $message){
            id
            
        }
    }
`