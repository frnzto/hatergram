import React, { useState }from 'react'
import Modal from "react-modal"
import addPost from "../../static/icons/createPost.png"
import { gql, useMutation} from "@apollo/client"

import "./CreatePost.css"

Modal.setAppElement('#root')

const CREATE_POST = gql``

const customStyles = {

    overlay:{
        backgroundColor     : "rgba(0,0,0,0.8)",
    },
    content : {
        
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      width                 : "30%",
      overflow              : "auto",
      minWidth              : "400px",
      marginRight           : '-50%',
      borderRadius          : "12px",
      backgroundColor       : "#acdbdf",
      transform             : 'translate(-50%, -50%)',
    }
  };

function CreatePost() {
    const [caption, setCaption] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <div className="createpost__container">
            <button className="createpost__button" onClick={()=> setModalOpen(true)}>
                <i className="fas fa-plus-circle"></i>
            </button>
            <Modal 
                isOpen={modalOpen} 
                onRequestClose={()=> setModalOpen(false)}
                style={customStyles}
                
            >
                <div className="createpost__container">
                    <div className="cretepost__wrapper">
                        <h2>Create Post</h2>
                        <textarea onChange={(e)=>setCaption(e.target.value)} className="createpost__input" name="" id="" cols="60" rows="5" placeholder="Write caption..."></textarea>
                        <input type="file" id="createpost__file" accept="image/*"/>
                        <label id="createpost__label" htmlFor="createpost__file">
                            <i className="fas fa-images"></i>  Choose a photo
                        </label>
                        <button onClick={()=>console.log("post")} id={caption ? "createpost__post_button" : "createpost__post_unactive"}>Post</button>
                    </div>
                </div>
                
            </Modal>    
        </div>
    )
}

export default CreatePost
