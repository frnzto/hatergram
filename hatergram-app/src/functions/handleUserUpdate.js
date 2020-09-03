import { storage } from "../firebase"

const handleUserUpdate= ({about, image, USER_BY_ID, matchId, avatar, POSTS, userUpdate, setProgress, setModalOpen})=>{
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
                        userUpdate({variables: {avatar: url, info: about},refetchQueries:[{query: POSTS}, {query: USER_BY_ID , variables: {id: parseInt(matchId) } }]})
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
    console.log("WHy i am still running")
    if(about){
        userUpdate({variables: {info: about},refetchQueries:[ {query: USER_BY_ID , variables: {id: parseInt(matchId) } }]})
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
                        userUpdate({variables: {avatar: url},refetchQueries:[{query: POSTS}, {query: USER_BY_ID , variables: {id: parseInt(matchId) } }]})
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