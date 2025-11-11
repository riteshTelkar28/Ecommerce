import express from 'express'
import { getAllOrdersForAdmin, getOrderDetails, updateOrderStatus } from '../../controller/admin/order-controller.js';

var adminOrderRouter = express.Router();

adminOrderRouter.get('/list',getAllOrdersForAdmin)
adminOrderRouter.get('/details/:id',getOrderDetails)
adminOrderRouter.put('/update/:id',updateOrderStatus)


export default adminOrderRouter;