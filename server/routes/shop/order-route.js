import express from 'express'
import { createOrder } from '../../controller/shop/order-controller.js';

var orderRouter = express.Router();

orderRouter.post('/create',createOrder)

export default orderRouter;