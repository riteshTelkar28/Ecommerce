import express from 'express'
import { searchProducts } from '../../controller/shop/search-controller.js';

var searchRouter = express.Router();

searchRouter.get('/:keyword',searchProducts)


export default searchRouter;