import React, { useEffect, useState} from 'react'
import Post from "../Post/Post"
import { useQuery } from "@apollo/client"

import {PAGINATE_POSTS, POSTS_FOLLOWED} from "../../graphql/queries"


function Posts({user, query}) {
    const {loading, error, data, fetchMore} = useQuery(query)
    const [isFetching, setIsFetching] = useState(false)
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
   
    if(data && query === POSTS_FOLLOWED){
        console.log(data)
        
        const onLoadMore =()=>{
            if(!data.postsFollowed.pageInfo.hasNextPage){
                return
            }
            console.log(data.postsFollowed.edges.length)
            setIsFetching(false)
            
            fetchMore({
                query:POSTS_FOLLOWED,
                variables: {offset: data.postsFollowed.edges.length},
                updateQuery:(previousResult, {fetchMoreResult})=>{
                    
                    if(fetchMoreResult.postsFollowed === null){ return}
                    const newEdges = fetchMoreResult.postsFollowed.edges
                    const pageInfo = fetchMoreResult.postsFollowed.pageInfo
                    return newEdges
                        ? {
                            postsFollowed: {
                                __typename: previousResult.postsFollowed.__typename,
                                edges: [...previousResult.postsFollowed.edges, ...newEdges],
                                pageInfo,
                            },
                            }
                        : previousResult;
                }
            })
        }

        return (
            <div>
                {data.postsFollowed.edges.map((post,index)=>{
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

    if(data && query === PAGINATE_POSTS){
        const onLoadMore = ()=>{
            if(!data.paginatePosts.pageInfo.hasNextPage){
                return
            }
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
