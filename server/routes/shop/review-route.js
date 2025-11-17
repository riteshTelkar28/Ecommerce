import express from 'express';
import { addProductReview, getProductReview } from '../../controller/shop/product-review-controller.js';

const reviewRouter = express.Router();

reviewRouter.post('/add',addProductReview)
reviewRouter.get('/get/:productId',getProductReview)

export default reviewRouter;