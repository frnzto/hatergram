import React from 'react'
import { HATES_ADD } from "../../graphql/mutations"
import {useMutation, gql} from "@apollo/client"
import "./SocialButtons.css"


function SocialButtons({postId, checkIfHated, focusRef, toggleComments}) {
    const [hatesAdd] = useMutation(HATES_ADD,{
        update(cache, { data: { hatesAdd } }) {
            cache.modify({
              fields: {
                posts(existingHates= []) {
                  const newPostRef = cache.writeFragment({
                    data: hatesAdd,
                    fragment: gql`
                      fragment newHate on Posts {
                            hates{
                                id
                                userId
                                postId
                            }
                        
                      }
                    `
                  });
                  return [...existingHates, newPostRef];
                }
              }
            });
          }
    })
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
                <button onClick={()=> {toggleComments(); focusInput()}} className="socialbuttons__button_comment"><span>Comment</span></button>
            </div>
        </div> 
    )
}

export default SocialButtons
