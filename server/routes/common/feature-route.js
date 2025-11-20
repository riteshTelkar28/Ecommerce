import express from 'express'
import { addFeatureImage, getFeatureImage } from '../../controller/admin/feature-controller.js'

var featureRouter = express.Router()

featureRouter.post('/add',addFeatureImage)
featureRouter.get('/get',getFeatureImage)

export default featureRouter;