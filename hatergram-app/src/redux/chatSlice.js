import {createSlice} from "@reduxjs/toolkit"

export const chatSlice = createSlice({
    name: "chatWindows",
    initialState:{
        rooms:[]
    },
    reducers:{
        openChat: (state,action)=> {
            console.log(state.rooms.includes(action.payload))
            if(state.rooms.includes(action.payload)){
                return
            }
            state.rooms.push(action.payload)
        },
        closeChat:(state, action)=>{
            const roomIndex = state.rooms.indexOf(action.payload)
            state.rooms.splice(roomIndex,1)
        }
    }
})

export const { openChat, closeChat }= chatSlice.actions
export const selectRooms = state => state.chatWindows.rooms
export default chatSlice.reducer