import Order from '../../model/Order.js'
import Review from '../../model/Review.js';
import Product from '../../model/Product.js'
export const addProductReview = async(request,response)=>{
    try{

        const {productId,userId,userName,reviewMessage,reviewValue} = request.body;

        const order = await Order.findOne({
            userId,
            "cartItems.productId":productId,
            orderStatus:'confirmed'
        })

        if(!order){
            return response.status(403).json({
                success:false,
                message:"you need to purchase this product to review"
            })
        }

        const checkExistingReview = await Review.findOne({productId,userId});

        if(checkExistingReview){
            return response.status(400).json({
                success:false,
                message:'Review already given'
            })
        }

        const newReview = new Review({productId,userId,userName,reviewMessage,reviewValue})


        await newReview.save()
        
        const reviews = await Review.find({productId});
        const totalReviews = reviews.length;
        const averageReview = reviews.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0) / totalReviews;

        await Product.findByIdAndUpdate(productId,{averageReview})

        response.status(201).json({
            success:true,
            data:newReview,
            message:'Review given'
        })


    }catch(error){
        console.log(error);
        response.status(500).json({
            success:false,
            message:'Something went wrong'
        })
    }
}

export const getProductReview = async(request,response)=>{
    try{
        const {productId} = request.params;
        // console.log("request.params ",request.params);
        
        const reviews = await Review.find({productId});
        // console.log("review ",reviews)

        response.status(201).json({
            success:true,
            data:reviews
        })

    }catch(error){
        console.log(error);
        response.status(500).json({
            success:false,
            message:'Something went wrong'
        })
    }
}