import {configureStore} from "@reduxjs/toolkit"
import chatReducer from "./redux/chatSlice"
export default configureStore({
    reducer:{
        chatWindows: chatReducer
    }
})