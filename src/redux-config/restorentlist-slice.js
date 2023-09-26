import axios from "axios";
import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
import api from "../Webapi/api";

export const fetchRestaurant = createAsyncThunk("restaurant/fetch-restaurant",async()=>{
    let response = await axios.get(api.RESTAURANT_LIST);
    return response.data;
})

const slice = createSlice({
    name : 'restaurant',
    initialState : {
        restaurantList : [],
        isLoding : false ,
        error : null
    },
    extraReducers : (builder)=>{
        builder.addCase(fetchRestaurant.pending,(state,action)=>{
            state.isLoding = true;
        }).addCase(fetchRestaurant.fulfilled,(state,action)={})
    }
})