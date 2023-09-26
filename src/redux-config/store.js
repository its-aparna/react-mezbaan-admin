import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./admin-slice";

const store = configureStore({
    reducer:{
        admin:adminSlice,
    }
});

export default store;