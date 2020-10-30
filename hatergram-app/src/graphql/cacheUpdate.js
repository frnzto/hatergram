
export const followUnfollowCacheUpdate = ({gql, matchId})=>(
    {
        update(cache, {data: {followUnfollow} }){
            cache.modify({
                fields:{
                    userById(existingUserById = []){
                        const newFolloerRef = cache.writeFragment({
                            data: followUnfollow,
                            variables: {id: matchId},
                            fragment: gql`
                                fragment newFollower on User_By_Id {
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
                            `
                        })
                        return [ existingUserById, newFolloerRef]
                    },
                    postsFollowed(ExistingPostFollow =[]){
                        const newPostsFollowerRef = cache.writeFragment({
                            data: followUnfollow,
                            variables: {id: matchId},
                            fragment: gql`
                                fragment newPostsFollower on POSTS_FOLLOWER{
                                    id
                                }
                            `
                        })
                        return [ ExistingPostFollow, newPostsFollowerRef]
                    }
                }
            })
        }
    }
)

export const deletePostCacheUpdate = ()=>(
    {
        update(cache) {
            cache.modify({
                fields:{
                    paginatePosts(existingPosts, {DELETE}){
                        return DELETE  
                    },
                    userById(existingUser, {DELETE}){
                        return DELETE
                    },
                    postsFollowed(existingPostsFollowed, {DELETE}){
                        return DELETE
                    }
                }
            })
        }
    }
)

export const addCommentCacheUpdate =({gql})=>(
    {
        update(cache, {data: {commentAdd} }) {
            cache.modify({
                fields: {
                    paginatePosts(existingPosts = []){
                        const newCommentRef= cache.writeFragment({
                            data: commentAdd,
                            fragment: gql`
                                fragment newComment on PaginatePosts{
                                    comment{
                                        id
                                        userId
                                        postId
                                    }
                                }
                            `
                        });
                        return[existingPosts, newCommentRef]
                    },
                    postsFollowed( existingPostsFollowed = []) {
                        const newPostsFollowedRef = cache.writeFragment({
                            data: commentAdd,
                            fragment: gql`
                                fragment newPostsFollowed on PostsFollowed{
                                    id
                                }
                            `
                        })
                        return [ existingPostsFollowed, newPostsFollowedRef]
                    },
                    commentsById( existingCommentById =[]) {
                        const newCommentById = cache.writeFragment({
                            data: commentAdd,
                            fragment: gql`
                                fragment newCommentById on CommentsById{
                                    id
                                }
                            `
                        })
                        return[ existingCommentById, newCommentById]
                    }
                }
            })
        }
    }
)

export const hateCacheUpdate = ({gql, postId})=>(
    {   
        update(cache, { data: { hatesAdd } }) {
            cache.modify({
              fields: {
                hates(existingHates= []) {
                //   const newPostRef = cache.writeFragment({
                //     data: hatesAdd,
                //     fragment: gql`
                //         fragment newHate on Hates {
                //             hates{
                //                 id
                //                 userId
                //                 postId
                //             }
                //         }
                //         `
                //   });
                },
              },
            });
          }
    }
)

export const createPostCacheUpdate =({gql, userId}) =>({
    update(cache, { data: { createPost } }) {
        cache.modify({
          fields: {
            paginatePosts(existingPosts= []) {
              const newPostRef = cache.writeFragment({
                data: createPost,
                fragment: gql`
                  fragment newPost on PaginatePosts {
                    
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
                    
                  }
                `
              });
              return [existingPosts, newPostRef];
            },
            userById(existingUsersById = []){
                const newUserRef = cache.writeFragment({
                    data: createPost,
                    variables: {id: userId},
                    fragment: gql`
                      fragment newUser on User_By_Id {
                        userById
                        id
                        username
                        avatar
                        info
                        posts{
                            id
                            image
                        }
                        
                      }
                    `
                  });
                return [existingUsersById, newUserRef]
            },
            postsFollowed( existingPostsFollowed = []) {
                const newPostsFollowedRef = cache.writeFragment({
                    data: createPost,
                    variables:{id: userId},
                    fragment: gql`
                        fragment newPostsFollowed on PostsFollowed{
                            id
                        }
                    `
                })
                return [existingPostsFollowed, newPostsFollowedRef]
            }
          }
        });
     }
 })