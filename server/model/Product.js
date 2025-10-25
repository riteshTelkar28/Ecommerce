import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    image:String,
    title:String,
    description:String,
    category:String,
    brand:String,
    price:Number,
    salesPrice:Number,
    totalStock:Number
},{timestamps:true})

export default mongoose.model('productSchema',productSchema,'product')