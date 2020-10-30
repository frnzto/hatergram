import React, { useState }from 'react'
import Modal from "react-modal"
import { useMutation} from "@apollo/client"
import { v4 as uuidv4 } from 'uuid';
import DarkModeToggler from "../DarkModeToggler/DarkModeToggler"

import { USER_UPDATE } from "../../graphql/mutations"
import handleUserUpdate from "../../functions/handleUserUpdate"

import "./UserSettings.css"

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
      backgroundColor       : localStorage.getItem("DarkMode") === "true" ? "#242526" : "#acdbdf",
      transform             : 'translate(-50%, -50%)',
    }
  };

function UserSettings({matchId, avatar, username}) {
    const [modalOpen, setModalOpen] = useState(false)
    const [image, setImage]= useState(null)
    const [about, setAbout]= useState("")
    const [progress, setProgress] = useState(0)
    const [userUpdate]= useMutation(USER_UPDATE)
    
    const handleImage=(e)=>{
        if(e.target.files[0]){
            const file= e.target.files[0]
            const randomId = uuidv4();
            const newName = `${randomId}${file.name}`
            const newFile = new File([file], newName, {type:file.type, size: file.size})
            setImage(newFile)
        }
    }
    
    return (
        <div>
            <i onClick={()=>setModalOpen(true)} className="fas fa-user-cog usersettings__icon"></i>
            <Modal 
                isOpen={modalOpen} 
                onRequestClose={()=> setModalOpen(false)}
                style={customStyles}
                
            >
                <div className="createpost__container">
                    <div className="cretepost__wrapper">
                        <progress value={progress} max="100"></progress>
                        <h2>User Settings</h2>
                        <div className="createpost__darkmode"><span>Dark Theme :</span> <DarkModeToggler/></div>
                        <textarea onChange={(e)=>setAbout(e.target.value)} className="createpost__input" name="" id="" cols="60" rows="5" placeholder="Say something about you..."></textarea>
                        <input type="file" id="createpost__file" accept="image/*" onChange={handleImage} />
                        <label id="createpost__label" htmlFor="createpost__file">
                            <i className="fas fa-images"></i>  Choose a photo
                        </label>
                        <button
                         onClick={()=>handleUserUpdate({about, image,  matchId, avatar, username, userUpdate, setProgress, setModalOpen})} 
                         id={image || about ? "createpost__post_button" : "createpost__post_unactive"}
                         >
                            Update
                        </button>
                    </div>
                </div>
                
            </Modal>   
        </div>
    )
}

export default UserSettings
