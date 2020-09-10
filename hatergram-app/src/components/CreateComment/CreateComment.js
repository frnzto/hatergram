import React, { useState } from 'react'
import {COMMENT_ADD} from "../../graphql/mutations"
import { useMutation, gql } from '@apollo/client'


import "./CreateComment.css"

function CreateComment({defaultAvatar, userAvatar, postId}) {
    const [comment, setComment]= useState("")
    const [commentAdd]= useMutation(COMMENT_ADD, {
        update(cache, {data: {commentAdd} }) {
            cache.modify({
                fields: {
                    posts(existingPosts = []){
                        const newCommentRef= cache.writeFragment({
                            data: commentAdd,
                            fragment: gql`
                                fragment newComment on Posts{
                                    comment{
                                        id
                                        userId
                                        postId
                                    }
                                }
                            `
                        });
                        return[...existingPosts, newCommentRef]
                    }
                }
            })
        }
    })

    const handleCommentAdd= (e)=>{
        if(comment){
            if( e.key === "Enter" ){
                commentAdd({variables: {postId, comment}})
                setComment("")
                
            }
        }

        
    }
    return (
        <div>
            <div className="createComment_container">
                <img src={userAvatar ? userAvatar : defaultAvatar} alt="" className=""/>
                <input 
                    value={comment}
                    type="text" 
                    placeholder="Write a comment..."
                    onChange={(e)=> setComment(e.target.value) } 
                    onKeyPress={handleCommentAdd}
                />
            </div>
        </div>
    )
}

export default CreateComment
