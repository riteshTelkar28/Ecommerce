import express from 'express'
import { authenticateUser, loginUser, logoutUser, registerUser } from '../../controller/auth/auth-controller.js'

var authrouter  = express.Router()

authrouter.post('/register',registerUser)
authrouter.post('/login',loginUser)
authrouter.post('/logout',logoutUser)
authrouter.get('/check-auth',authenticateUser,(request,response)=>{
    const  user = request.user;
    response.status(200).json({
        success:true,
        message:'authenticated user',
        user
    })
})

export default authrouter;