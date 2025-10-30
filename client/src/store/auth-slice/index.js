import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
    isAuthenticated:false,
    isLoading:true,
    user:null
}

export const registerUser = createAsyncThunk('/auth/register',
    async(formData)=>{
        console.log("form data ",formData)
        const response = await axios.post('http://localhost:5000/api/auth/register',formData,{
            withCredentials:true
        });
        return response.data;

    }
)

export const loginUser = createAsyncThunk('/auth/login',
    async(formData)=>{
        // console.log("form data ",formData)
        const response = await axios.post('http://localhost:5000/api/auth/login',formData,{
            withCredentials:true
        });
        return response.data;

    }
)

export const logoutUser = createAsyncThunk('/auth/logout',
    async()=>{
        // console.log("form data ",formData)
        const response = await axios.post('http://localhost:5000/api/auth/logout',{},{
            withCredentials:true
        });
        return response.data;

    }
)
export const authenticateUser = createAsyncThunk('/auth/check-auth',
    async()=>{
        // console.log("form data ",formData)
        const response = await axios.get('http://localhost:5000/api/auth/check-auth',{
            withCredentials:true
        });
        return response.data;

    }
)
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        // setUser : (state,action)=>{

        // }
        
    },
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading = true
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = action.payload
            state.isAuthenticated = false            
        }).addCase(registerUser.rejected,(state)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false            
        }).addCase(loginUser.pending,(state)=>{
            state.isLoading = true
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = action.payload.user
            console.log("action ",action);
            state.isAuthenticated = action.payload.success            
        }).addCase(loginUser.rejected,(state)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false            
        }).addCase(authenticateUser.pending,(state)=>{
            state.isLoading = true
        }).addCase(authenticateUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = action.payload.user;
            console.log("action ",action)
            state.isAuthenticated = action.payload.success
        }).addCase(authenticateUser.rejected,(state)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
        }).addCase(logoutUser.fulfilled,(state)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
        })
    }
})

export const {setUser} = authSlice.actions
export default authSlice.reducer;