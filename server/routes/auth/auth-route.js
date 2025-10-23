import express from 'express'
import { registerUser } from '../../controller/auth/auth-controller.js'

var authrouter  = express.Router()

authrouter.post('/register',registerUser)

export default authrouter;