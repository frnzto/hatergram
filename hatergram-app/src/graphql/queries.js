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
    query PostsFollowed{
        postsFollowed{
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

export const COMMENTS_BY_ID = gql`
    query CommentsById($postId: Int){
        commentsById(postId: $postId){
            id
            userId
            comment
            createdAt
            user{
                username
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
            pageInfo{
                endCursor
                hasNextPage
            }
        }
    }
`