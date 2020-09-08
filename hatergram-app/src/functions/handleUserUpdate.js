import { storage } from "../firebase"

const handleUserUpdate= ({about, image, matchId, avatar, userUpdate, setProgress, setModalOpen})=>{
    if(about && image){
        const imageUrl = avatar
        if(imageUrl){
            storage.refFromURL(imageUrl).delete()
        }
        const UploadTask = storage.ref(`avatars/${image.name}`).put(image)
        return UploadTask.on(
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
                        userUpdate({variables: {avatar: url, info: about}})
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
    if(about){
        userUpdate({variables: {info: about}})
        .then(setModalOpen(false))
    }
    
    if(image){
        const imageUrl = avatar
        if(imageUrl){
            storage.refFromURL(imageUrl).delete()
        }
        const UploadTask = storage.ref(`avatars/${image.name}`).put(image)
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
                        userUpdate({variables: {avatar: url}})
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
export default handleUserUpdate