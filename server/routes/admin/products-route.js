import express from 'express'
import { handleImageUpload,addProduct,editProduct,fetchProduct,deleteProduct } from '../../controller/admin/product-controller.js'

import {upload} from '../../helpers/cloudinary.js'

var productRouter = express.Router()

productRouter.post('/upload-image',upload.single('my_file'),handleImageUpload)

productRouter.post('/add',addProduct)
productRouter.put('/edit/:id',editProduct)
productRouter.delete('/delete/:id',deleteProduct)
productRouter.get('/get',fetchProduct)

export default productRouter;