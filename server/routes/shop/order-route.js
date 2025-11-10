import express from 'express'
import { capturePayment, createOrder, getAllOrdersByUser, getOrderDetails } from '../../controller/shop/order-controller.js';

var orderRouter = express.Router();

orderRouter.post('/create',createOrder);
orderRouter.post('/capture',capturePayment)
orderRouter.get('/list/:userId',getAllOrdersByUser)
orderRouter.get('/details/:id',getOrderDetails)

export default orderRouter;