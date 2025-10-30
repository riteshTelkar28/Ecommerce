import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading:true,
    productList:[]
}

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllFilteredProducts',async()=>{
    const result = await axios.get('http://localhost:5000/api/shop/products/get')

    return result.data
})
const ShopProductSlice = createSlice({
    name:'shopProducts',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAllFilteredProducts.pending,(state)=>{
            state.isLoading = true
        }).addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
            state.isLoading = false
            state.productList = action.payload.data
        }).addCase(fetchAllFilteredProducts.rejected,(state)=>{
            state.isLoading = false
            state.productList = []
        })
    }
})

export default ShopProductSlice.reducer;