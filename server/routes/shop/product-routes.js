import express from 'express'
import { fetchFilteredProduct} from '../../controller/shop/product-controller.js';

var shopProductRouter = express.Router()

shopProductRouter.get('/get',fetchFilteredProduct)

export default shopProductRouter;