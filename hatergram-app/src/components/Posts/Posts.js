import React, { useEffect, useState} from 'react'
import Post from "../Post/Post"
import { useQuery } from "@apollo/client"

import {PAGINATE_POSTS, POSTS, POSTS_FOLLOWED} from "../../graphql/queries"


function Posts({user, query}) {
    const {loading, error, data, fetchMore} = useQuery(query)
    const [isFetching, setIsFetching] = useState(false)
    console.log(isFetching)
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
        
    }, [])
    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setIsFetching(true);
        }


    if(error){return alert(error)}
    if(loading){return <div>Loading...</div>}
    if(data && query === POSTS){
        
        return (
            data.posts.map((post, index)=>{
                
                return <Post 
                    key={index}
                    caption={post.caption}
                    image={post.image}
                    username={post.user.username}
                    userAvatar={user.avatar}
                    postAvatar={post.user.avatar}
                    hates= { post.hates ? post.hates : [] }
                    postId={post.id}
                    postOwner={post.user}
                    currentUser={user}
                    comments= {post.comments}
                />
            })
        )
    }
    if(data && query === POSTS_FOLLOWED){
        
        return (
            data.postsFollowed.map((post,index)=>{
                    
                    return <Post 
                    key={index}
                    caption={post.caption}
                    image={post.image}
                    username={post.user.username}
                    userAvatar={user.avatar}
                    postAvatar={post.user.avatar}
                    hates= { post.hates ? post.hates : [] }
                    postId={post.id}
                    postOwner={post.user}
                    currentUser={user}
                    comments= {post.comments}
                    />
                }
                
                
            )
        )
    }

    if(data && query === PAGINATE_POSTS){
        const onLoadMore = ()=>{
            if(!data.paginatePosts.pageInfo.hasNextPage){
                return
            }
            console.log(data.paginatePosts)
            setIsFetching(false)
            
            fetchMore({
                query:PAGINATE_POSTS,
                variables: {cursor: data.paginatePosts.pageInfo.endCursor},
                updateQuery:(previousResult, {fetchMoreResult})=>{
                    if(fetchMoreResult.paginatePosts === null){ return}
                    const newEdges = fetchMoreResult.paginatePosts.edges
                    const pageInfo = fetchMoreResult.paginatePosts.pageInfo
                    return newEdges.length
                        ? {
                            paginatePosts: {
                                __typename: previousResult.paginatePosts.__typename,
                                edges: [...previousResult.paginatePosts.edges, ...newEdges],
                                pageInfo,
                            },
                            }
                        : previousResult;
                }
            })
        }
    
        return (
            <div>
                {data.paginatePosts.edges.map((post, index)=>{
                            return <Post 
                                        key={index}
                                        caption={post.node.caption}
                                        image={post.node.image}
                                        username={post.node.user.username}
                                        userAvatar={user.avatar}
                                        postAvatar={post.node.user.avatar}
                                        hates= { post.node.hates ? post.node.hates : [] }
                                        postId={post.node.id}
                                        postOwner={post.node.user}
                                        currentUser={user}
                                        comments= {post.node.comments}
                                    />
                        })}
                {isFetching ? onLoadMore(): null}
            </div>
                    
                
                
        )
    }
    
    
    else{ return <h1>Loading.1..</h1> }
}

export default Posts
