import express from 'express'
import { addToCart, deleteFromCart, fetchFromCart, updateToCart } from '../../controller/shop/cart-controller.js';

var cartRouter = express.Router()

cartRouter.post('/add',addToCart)
cartRouter.get('/get/:userId',fetchFromCart)
cartRouter.put('/update',updateToCart)
cartRouter.delete('/delete/:userId/:productId',deleteFromCart)
export default cartRouter;