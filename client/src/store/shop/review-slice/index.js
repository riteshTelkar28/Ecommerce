import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading:false,
    reviews:[]
}

export const addReview = createAsyncThunk('/review/addReview',async(data)=>{
    const result = await axios.post('http://localhost:5000/api/shop/review/add',data)

    return result?.data;
})

export const getReview = createAsyncThunk('/review/getReview',async(productId)=>{
    const result = await axios.post(`http://localhost:5000/api/shop/review/get/${productId}`)

    return result?.data;
})


const reviewSlice = createSlice({ 
    name:'review',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addReview.pending,(state)=>{
            state.isLoading = true
        }).addCase(addReview.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.reviews = action.payload.data
        }).addCase(addReview.rejected,(state)=>{
            state.isLoading = false;
            state.reviews = []
        }).addCase(getReview.pending,(state)=>{
            state.isLoading = true
        }).addCase(getReview.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.reviews = action.payload.data
        }).addCase(getReview.rejected,(state)=>{
            state.isLoading = false;
            state.reviews = []
        })
    }
})

export default reviewSlice.reducer;