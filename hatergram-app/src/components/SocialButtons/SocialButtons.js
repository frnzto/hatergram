import React from 'react'
import {useMutation, gql} from "@apollo/client"

import { HATES_ADD } from "../../graphql/mutations"
import { hateCacheUpdate } from '../../graphql/cacheUpdate'

import "./SocialButtons.css"

function SocialButtons({postId, checkIfHated, focusRef, toggleComments, lazyComments}) {
    const [hatesAdd] = useMutation(HATES_ADD,hateCacheUpdate({gql}))
    const focusInput = ()=>{
      focusRef.current.focus()
  }
    
    const addRemoveHate = (postId)=> hatesAdd({variables: {postId}})
        
    return (
        <div className="socialbuttons__container">
            <div className="socialbuttons__buttons">
                <button 
                  onClick={()=>addRemoveHate(postId)} 
                  className={checkIfHated.length > 0 ? "socialbutton__button_activeHate":"socialbuttons__button_hate"}
                >
                  <span>Hate</span>
                </button>
                <button className="socialbuttons__button_like"><span>Like</span></button>
                <button onClick={()=> {toggleComments(); focusInput() ; lazyComments()}} className="socialbuttons__button_comment"><span>Comment</span></button>
            </div>
        </div> 
    )
}

export default SocialButtons
