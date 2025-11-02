import express from 'express'
import { fetchFilteredProduct, getProductDetails} from '../../controller/shop/product-controller.js';

var shopProductRouter = express.Router()

shopProductRouter.get('/get',fetchFilteredProduct)
shopProductRouter.get('/get/:id',getProductDetails)


export default shopProductRouter;