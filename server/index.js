import express from 'express'
import './connection/connection.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authrouter from './routes/auth/auth-route.js';
import productRouter from './routes/admin/products-route.js';
var app = express()
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','DELETE','PUT'],
    allowedHeaders:[
        "Content-type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials:true
}))

app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/api/auth',authrouter)
app.use('/api/admin/products',productRouter)

app.listen(PORT,()=>{
    console.log("server started")
})