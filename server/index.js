import express from 'express'
import './connection/connection.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authrouter from './routes/auth/auth-route.js';
import productRouter from './routes/admin/products-route.js';
import shopProductRouter from './routes/shop/product-routes.js';
import cartRouter from './routes/shop/cart-routes.js';
import addressRouter from './routes/address/address-route.js';
import orderRouter from './routes/shop/order-route.js';
import adminOrderRouter from './routes/admin/order-route.js';
import searchRouter from './routes/shop/search-routes.js';

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
app.use('/api/admin/order',adminOrderRouter)
app.use('/api/shop/products',shopProductRouter)
app.use('/api/shop/cart',cartRouter)
app.use('/api/shop/address',addressRouter)  
app.use('/api/shop/order',orderRouter)
app.use('/api/shop/search',searchRouter)

app.listen(PORT,()=>{
    console.log("server started")
})