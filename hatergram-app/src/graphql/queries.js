import {gql} from "@apollo/client"

export const POSTS = gql`
query Posts{
    posts(first: ${2}){
        id
        caption
        image
        user{
            id
            username
            avatar
        }
        hates{
            id
            userId
            postId
        }
        comments{
            id
            userId
            postId
            comment
            createdAt
            user{
                id
                username
                avatar
            }
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
        avatar
    }
}
`

export const USER_BY_ID= gql`
    query User_By_Id($id: Int){
        userById(id: $id){
            id
            username
            avatar
            info
            posts{
                id
                image
            }
            following{
                id
                followed
                followedName{
                    id
                    username
                }
            }
            followers{
                id
                follower
                followerName{
                    id
                    username
                }
            }
        }
    }
`
export const HATES= gql`
    query Hates($postId: Int){
        hates(postId: $postId){
            userId
        }
        
    }
`

export const POSTS_FOLLOWED = gql`
    query PostsFollowed($offset: Int){
        postsFollowed(offset:$offset, limit:${3}){
            edges{
                cursor
                node{
                    id
                    caption
                    image
                    user{
                        id
                        username
                        avatar
                    }
                    hates{
                        id
                        userId
                        postId
                    }
                    comments{
                        id
                        
                        
                    }
                }
            }
            pageInfo{
                endCursor
                hasNextPage
            }
        }
    }
`

export const COMMENTS_BY_ID = gql`
    query CommentsById($postId: Int, $offset: Int, $limit:Int){
        commentsById(postId: $postId, offset: $offset, limit: $limit){
            id
            userId
            comment
            postId
            createdAt
            user{
                id
                username
                avatar
            }
        }
    }
`
export const PAGINATE_POSTS = gql`
    query PaginatePosts($cursor: String){
        paginatePosts(cursor: $cursor, limit: ${3}){
            
            edges{
                cursor
                node{
                    id
                    caption
                    image
                    user{
                        id
                        username
                        avatar
                    }
                    hates{
                        id
                        userId
                        postId
                    }
                    comments{
                        id
                        
                    }
                }
            }
            pageInfo{
                endCursor
                hasNextPage
            }
        }
    }
`

export const CHAT_ROOMS = gql`
    query ChatRooms{
        chatRooms{
            id
            name
            messages{
                id
                userId
                message
                user{
                    id
                    username
                    avatar
                }
            }
            firstUserInfo{
                id
                username
                avatar
            }
            secondUserInfo{
                id
                username
                avatar
            }
        }
        
    }
`

export const ROOM_MESSAGES = gql`
    query RoomMessages($roomName: String){
        roomMessages(roomName: $roomName){
            id
            chatroom
            message
            userId
            user{
                id
                username
            }
        }
    }
`
export const NEW_MESSAGE = gql`
    subscription NewMessage{
        newMessage{
            id
            chatroom
            message
            userId
            user{
                id
                username
            }
        }
    }
`

export const CHAT_ROOM_BY_NAME = gql`
    query ChatRoomByName($chatRoomName: String){
        chatRoomByName(chatRoomName: $chatRoomName){
            id
            name
            messages{
                id
                userId
                message
                user{
                    id
                    username
                    avatar
                }
            }
            firstUserInfo{
                id
                username
                avatar
            }
            secondUserInfo{
                id
                username
                avatar
            }
        }
    }
`