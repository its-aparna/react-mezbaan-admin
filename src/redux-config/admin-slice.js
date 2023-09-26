import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:"admin",
    initialState:{
        currentAdmin:null,
    },
    reducers:{
        setAdmin:(state,action)=>{
            // window.alert("setAdmin called");
            // console.log("action paylod"+action.payload)
            state.currentAdmin = action.payload;
        }
    }
})

export const {setAdmin} = slice.actions;
export default slice.reducer;