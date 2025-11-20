import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isLoading:false,
    featureImages :[]
}



export const getFeatureImage = createAsyncThunk('/feature/get',async()=>{
    const result = await axios.get(`http://localhost:5000/api/common/feature/get`)

    return result?.data;
})

export const addFeatureImage = createAsyncThunk('/feature/add',async(image)=>{
    const result = await axios.post(`http://localhost:5000/api/common/feature/add`,{image})

    return result?.data;
})

const commonSlice = createSlice({
    name:'feature',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getFeatureImage.pending,(state)=>{
            state.isLoading = true
        }).addCase(getFeatureImage.fulfilled,(state,action)=>{
            state.isLoading = false;
            // console.log("action ",action.payload.data);
            
            state.featureImages = action.payload.data
        }).addCase(getFeatureImage.rejected,(state)=>{
            state.isLoading = false
        }).addCase(addFeatureImage.pending,(state)=>{
            state.isLoading = true
        }).addCase(addFeatureImage.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.featureImages = action.payload.data
        }).addCase(addFeatureImage.rejected,(state)=>{
            state.isLoading = false
        })
    }
})

export default commonSlice.reducer;