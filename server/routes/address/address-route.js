import express from 'express'
import { addAddress, deleteAddress, editAddress, fetchAllAddress } from '../../controller/shop/address-controller.js';

var addressRouter = express.Router();

addressRouter.post('/add',addAddress);
addressRouter.get('/get/:userId',fetchAllAddress)
addressRouter.delete('/delete/:userId/:addressId',deleteAddress)
addressRouter.put('/update/:userId:addressId',editAddress)

export default addressRouter;