import React, { useState, forwardRef } from 'react'
import { useMutation, gql } from '@apollo/client'

import {COMMENT_ADD} from "../../graphql/mutations"
import { addCommentCacheUpdate } from '../../graphql/cacheUpdate'

import "./CreateComment.css"

const CreateComment = forwardRef(({defaultAvatar, userAvatar, postId}, inputRef) => {
    const [comment, setComment]= useState("")
    const [commentAdd]= useMutation(COMMENT_ADD, addCommentCacheUpdate({gql}) )

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
                    ref= {inputRef}
                    value={comment}
                    type="text" 
                    placeholder="Write a comment..."
                    onChange={(e)=> setComment(e.target.value) } 
                    onKeyPress={handleCommentAdd}
                />
            </div>
        </div>
    )
})

export default CreateComment
