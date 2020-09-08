import React from 'react'
import { HATES_ADD } from "../../graphql/mutations"
import {useMutation, gql} from "@apollo/client"
import "./SocialButtons.css"
import { POSTS } from "../../graphql/queries"


function SocialButtons({postId}) {
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
    const addRemoveHate = (postId)=> hatesAdd({variables: {postId}})
        
    return (
        <div className="socialbuttons__container">
            <div className="socialbuttons__buttons">
                <button onClick={()=>addRemoveHate(postId)} id="socialbuttons__button">Hate</button>
                <button id="socialbuttons__button">Like</button>
                <button id="socialbuttons__button">Comment</button>
            </div>
        </div> 
    )
}

export default SocialButtons
