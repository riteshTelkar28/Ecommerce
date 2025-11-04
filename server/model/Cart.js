import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User', // connects this field to user collection
        required:true
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId, // referes to another document's _id
                ref:'Product'
            },
            quantity:{
                type:Number,
                min:1
            }
        }
    ]
},
{timestamps:true})

export default mongoose.model('Cart',CartSchema,'Cart');

// we will get the full user details using using .populate