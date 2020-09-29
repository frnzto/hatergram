import React , {useRef , createRef} from 'react'
import ReactDOM from "react-dom"
import { Link } from 'react-router-dom'
import { useLazyQuery, useMutation } from '@apollo/client'
import { storage } from "../../firebase"

import defaultAvatar from "../../static/icons/user.png"
import SocialButtons from '../SocialButtons/SocialButtons'
import Comment from "../Comment/Comment"
import CreateComment from '../CreateComment/CreateComment'
import {DELETE_POST, HATES_DELETE, COMMENTS_DELETE} from '../../graphql/mutations'
import { deletePostCacheUpdate } from '../../graphql/cacheUpdate'
import { COMMENTS_BY_ID } from "../../graphql/queries"

import "./Post.css"
import Button from '../Button/Button'



function Post({caption, image, username, postAvatar, userAvatar, hates, postId, currentUser, postOwner, comments }) {
    const inputRef= createRef()
    const commentsRef = useRef()
    const [hatesDelete]= useMutation(HATES_DELETE)
    const [commentsDelete]= useMutation(COMMENTS_DELETE)
    const [deletePost]=useMutation(DELETE_POST, deletePostCacheUpdate())
    const [commentsById,{loading, data, fetchMore}] = useLazyQuery(COMMENTS_BY_ID, {variables: {postId: postId}})
    const checkIfHated = hates.filter(hate=> hate.userId === currentUser.id)
    const handleDelete = async()=>{
        const imageUrl = image
        await storage.refFromURL(imageUrl).delete()
        deletePost({variables : {id: postId} })
        commentsDelete({variables: {postId} })
        hatesDelete({variables: {postId} })
    }
    const toggleComments = () =>{
        const node= ReactDOM.findDOMNode(commentsRef.current)
        commentsById()
        node.classList.toggle("commentsHide")
    }
    const openComments = ()=>{
        const node= ReactDOM.findDOMNode(commentsRef.current)
        if(node.classList.contains("commentsHide")){
            commentsById()
            node.classList.remove("commentsHide")
        }else{
            return
        }
        
    }

    const loadMoreComments= ()=>{
        fetchMore({
            query:COMMENTS_BY_ID,
            variables:{
                offset: data.commentsById.length, 
                postId: postId,    
            },
            updateQuery:(previousResult, {fetchMoreResult}) =>{
                return {commentsById:[ ...previousResult.commentsById, ...fetchMoreResult.commentsById]} 
            }
        })
    }

    return (
        <div className="post__container">
            <div className="post__header">
                { currentUser.id === postOwner.id ? <i onClick={handleDelete} className="fas fa-trash-alt post__delete"></i> : null}
                
                <div>
                   <Link to={`/users/${postOwner.id}`}><img className="post__avatar" src={postAvatar ? postAvatar : defaultAvatar} alt=""/></Link> 
                    <h3>{username}</h3>
                </div>
                <h2>{caption}</h2>
            </div>
            <div className="post__image_bg">
                <img className="post__image" src={image} alt=""/>
            </div>
            <div className="post__likesbox">
                <p>hates: {hates.length}</p>
                <p onClick={comments.length ? toggleComments: null} className="post__commentsCount">comments: {comments.length}</p>
            </div>
            <SocialButtons focusRef={inputRef} lazyComments={commentsById}  toggleComments={toggleComments} checkIfHated={checkIfHated} postId={postId} />
            <div className="post__comments">
                <CreateComment ref={inputRef} openComments={openComments} userAvatar={userAvatar} postId={postId} defaultAvatar={defaultAvatar}/>
                <div ref={commentsRef} className="post__comments_bubble commentsHide">
                    {/* {comments.map((comment, index)=>
                        <Comment key={index} comment={comment}/>    
                    )} */}
                    {loading ? <div>Loading...</div> :
                        (data ? (data.commentsById.map((comment,index)=>{
                            return <Comment key={index} comment={comment}/>   
                        })) : null)
                    }
                    {data ? (data.commentsById.length < comments.length ? <Button onClickFunc={loadMoreComments} value="View more" cssStyle="btn__follow btn__large btn__mb"></Button>:null): null}
                    
                </div>

            </div>
        </div>
    )
}

export default Post
