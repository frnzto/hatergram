import {gql} from "@apollo/client"

export const POSTS = gql`
query Posts{
    posts{
        id
        caption
        image
        user{
            username
            avatar
        }
    }
}
`

export const USER = gql`
query User{
    user{
        username
        email
        id
    }
}
`

export const USER_BY_ID= gql`
    query User_By_Id($id: Int){
        userById(id: $id){
            id
            username
            avatar
            posts{
                id
                image
            }
        }
    }
`