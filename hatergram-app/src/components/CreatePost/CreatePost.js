import React, { useState }from 'react'
import Modal from "react-modal"
import { gql, useMutation} from "@apollo/client"
import { v4 as uuidv4 } from 'uuid';

import {storage} from "../../firebase.js"
import { CREATE_POST } from "../../graphql/mutations"
import { createPostCacheUpdate } from '../../graphql/cacheUpdate.js';

import "./CreatePost.css"

Modal.setAppElement('#root')

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

function CreatePost({username, userId}) {
    const [caption, setCaption] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [image, setImage]= useState(null)
    const [progress, setProgress] = useState(0)
    const [createPost]= useMutation(CREATE_POST, createPostCacheUpdate({gql, userId})
    )
    
    const handleImage=(e)=>{
        if(e.target.files[0]){
            const file= e.target.files[0]
            const randomId = uuidv4();
            const newName = `${randomId}${file.name}`
            const newFile = new File([file], newName, {type:file.type, size: file.size})
            
            
            setImage(newFile)
        }
    }

    const handlePost = ()=>{
        if(image){
            const UploadTask = storage.ref(`users/${username}/images/${image.name}`).put(image)
            UploadTask.on(
                "state_changed", snapshot => {
                    const progressing =Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                setProgress(progressing)
                },
                error => {
                    console.log(error)
                    alert(error.message)
                },()=>{
                    UploadTask.snapshot.ref.getDownloadURL()
                        .then(url=>{
                            console.log(url)
                            createPost({variables: {caption: `${caption}`, image: url}})
                                .then(res=>{
                                    setModalOpen(false)
                                    setProgress(0)
                                }
                            )
                        }
                    )
                }
            
            )
        }

    }


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
                        <progress value={progress} max="100"></progress>
                        <h2>Create Post</h2>
                        <textarea onChange={(e)=>setCaption(e.target.value)} className="createpost__input" name="" id="" cols="60" rows="5" placeholder="Write caption..."></textarea>
                        <input type="file" id="createpost__file" accept="image/*" onChange={handleImage} />
                        <label id="createpost__label" htmlFor="createpost__file">
                            <i className="fas fa-images"></i>  Choose a photo
                        </label>
                        <button onClick={handlePost} id={image ? "createpost__post_button" : "createpost__post_unactive"}>Post</button>
                    </div>
                </div>
                
            </Modal>    
        </div>
    )
}

export default CreatePost
