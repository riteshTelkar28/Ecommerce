import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading:false,
    cartItems:[],
    productId:null
}

export const addToCart = createAsyncThunk('cart/addToCart',async({userId,productId,quantity})=>{
        const response = await axios.post('http://localhost:5000/api/shop/cart/add',{
            userId,productId,quantity
        })

        return response?.data;
})

export const fetchFromCart = createAsyncThunk('cart/fetchFromCart',async(userId)=>{
    console.log("userid ",userId);
    
        const response = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`)

        return response?.data;
})

export const updateToCart = createAsyncThunk('cart/updateToCart',async({userId,productId,quantity})=>{
        const response = await axios.put('http://localhost:5000/api/shop/cart/update',{
            userId,productId,quantity
        })

        return response?.data;
})

export const deleteFromCart = createAsyncThunk('cart/deleteFromCart',async({userId,productId})=>{
        const response = await axios.delete(`http://localhost:5000/api/shop/cart/delete/${userId}/${productId}`)

        return response?.data;
})
const shoppingCartSlice = createSlice({
    name:'shoppinCart',
    initialState,
    reducers:{
                setProductId:(state,action)=>{
            state.productId = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addToCart.pending,(state)=>{
            state.isLoading = true;
        }).addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.cartItems = action.payload.data
        }).addCase(addToCart.rejected,(state)=>{
            state.isLoading = true;
            state.cartItems = []
        }).addCase(fetchFromCart.pending,(state)=>{
            state.isLoading = true;
        }).addCase(fetchFromCart.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.cartItems = action.payload.data
        }).addCase(fetchFromCart.rejected,(state)=>{
            state.isLoading = true;
            state.cartItems = []
        }).addCase(updateToCart.pending,(state)=>{
            state.isLoading = true;
        }).addCase(updateToCart.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.cartItems = action.payload.data
        }).addCase(updateToCart.rejected,(state)=>{
            state.isLoading = true;
            state.cartItems = []
        }).addCase(deleteFromCart.pending,(state)=>{
            state.isLoading = true;
        }).addCase(deleteFromCart.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.cartItems = action.payload.data
        }).addCase(deleteFromCart.rejected,(state)=>{
            state.isLoading = true;
            state.cartItems = []
        })
    }
})
export const {setProductId} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;