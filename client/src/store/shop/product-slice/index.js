import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading:true,
    productList:[],
    productDetails:null,
}

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllFilteredProducts',async({filterParams,sortParams})=>{
    const query = new URLSearchParams({
        ...filterParams,
        sortBy:sortParams
    })
    const result = await axios.get(`http://localhost:5000/api/shop/products/get?${query}`)


    return result.data
})

export const getProductDetails = createAsyncThunk('/products/getProductDetails',async(id)=>{

    const result = await axios.get(`http://localhost:5000/api/shop/products/get/${id}`)


    return result?.data
})

const ShopProductSlice = createSlice({
    name:'shopProducts',
    initialState,
    reducers:{
        setProductDetails:(state)=>{
            state.productDetails = null;
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllFilteredProducts.pending,(state)=>{
            state.isLoading = true
        }).addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
            state.isLoading = false
            state.productList = action.payload.data
        }).addCase(fetchAllFilteredProducts.rejected,(state)=>{
            state.isLoading = false
            state.productList = []
        }).addCase(getProductDetails.pending,(state)=>{
            state.isLoading = true
        }).addCase(getProductDetails.fulfilled,(state,action)=>{
            state.isLoading = false
            state.productDetails = action.payload.data
        }).addCase(getProductDetails.rejected,(state)=>{
            state.isLoading = false
            state.productDetails = null
        })
    }
})

export const {setProductDetails} = ShopProductSlice.actions;
export default ShopProductSlice.reducer;