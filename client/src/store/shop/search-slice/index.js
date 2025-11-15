import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading:false,
    searchResults : []
}

export const searchResult = createAsyncThunk('/shop/searchResult',async(keyword)=>{
    const result = await axios.get(`http://localhost:5000/api/shop/search/${keyword}`);

    return result?.data;
})
const SearchSlice = createSlice({
    name:'search',
    initialState,
    reducers:{
        resetSearch :(state)=>{
            state.searchResults = []
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(searchResult.pending,(state)=>{
            state.isLoading = true;
        }).addCase(searchResult.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.searchResults = action.payload.data
        }).addCase(searchResult.rejected,(state)=>{
            state.isLoading = false
            state.searchResults = []
        })
    }
})

export const {resetSearch} = SearchSlice.actions;
export default SearchSlice.reducer;