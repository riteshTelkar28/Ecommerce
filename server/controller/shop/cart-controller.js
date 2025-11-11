import Cart from "../../model/Cart.js";
import Product from "../../model/Product.js";

export const addToCart = async(request,response)=>{
    try{
        console.log(request.body);
        
        const {userId,productId,quantity} = request.body;
        if(!userId || !productId || quantity<=0)
            return response.status(400).json({
                success:false,
                message:'data not provided'
        })

        const product = await Product.findById(productId);
        if(!product){
            return response.status(404).json({
                success:false,
                message:'Data not found'
            })
        }

        let cart = await Cart.findOne({userId});
        if(!cart){
            cart = new Cart({userId,items:[]})
        }

        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if(findCurrentProductIndex === -1){
            cart.items.push({productId,quantity});
        }else{
            cart.items[findCurrentProductIndex].quantity += quantity;
        }

        await cart.save();
        response.status(200).json({
            success:true,
            data:cart,
            message:'Added to Cart'
        })
    }catch(error){
        console.log(error);
        response.status(500).json({
            success:false,
            message:'something went wrong'
        })
    }
}

export const fetchFromCart = async(request,response)=>{
    try{
        const userId = request.params.userId;
        // console.log("userId ",userId, typeof userId);
        
        if(!userId){
        return response.status(404).json({
            success:false,
            message:'user not found'
        }) 
    }

        const cart = await Cart.findOne({userId}).populate({
            path:'items.productId',
            select:'image title price salePrice'
        })

        if(!cart){
        return response.status(404).json({
            success:false,
            message:'cart not found'
        })    
        }

    const validItems = cart.items.filter(productItem => productItem.productId);
    if(validItems.length < cart.items.length){
        cart.items = validItems
        await cart.save()
    }

    const populateCartItems = validItems.map(item=>({
        productId:item.productId._id,
        image:item.productId.image,
        title:item.productId.title,
        price:item.productId.salePrice < item.productId.price ? item.productId.salePrice : item.productId.price,
        salePrice:item.productId.salePrice,
        quantity:item.quantity
    }))

    response.status(200).json({
        success:true,
        data:{
            ...cart._doc,
            items:populateCartItems
        }
    })
    }catch(error){
        console.log(error , "error");
        response.status(500).json({
            success:false,
            message:'something went wrong'
        })
    }
}

export const updateToCart = async(request,response)=>{
    try{
        const {userId,productId,quantity} = request.body;
        if(!userId || !productId || quantity<=0)
            return response.status(400).json({
                success:false,
                message:'data not provided'
        })

        const cart = await Cart.findOne({userId});
        if(!cart){
        return response.status(404).json({
            success:false,
            message:'cart not found'
        })
        }
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        
        if(findCurrentProductIndex===-1){
        return response.status(404).json({
            success:false,
            message:'cart item not found'
        }) 
        }

        cart.items[findCurrentProductIndex].quantity = quantity;
        await cart.save();
        await cart.populate({
            path:'items.productId',
            select:'image title price salePrice',
        })
        
        const populateCartItems = cart.items.map(item=>({
            productId:item.productId ? item.productId._id : null,
            image:item.productId ? item.productId.image : null,
            title:item.productId ? item.productId.title : null,
            price:item.productId ? item.productId.price : null,
            salePrice:item.productId ? item.productId.salePrice: null,
            quantity:item.quantity
        }))
        response.status(200).json({
            success:true,
            data:{
                ...cart._doc,
                items:populateCartItems
            },
            message:'Updated Successfully'
        })
    }catch(error){
        console.log(error);
        response.status(500).json({
            success:false,
            message:'something went wrong'
        })
    }
}

export const deleteFromCart = async(request,response)=>{
    try{
        const {userId,productId} = request.params;
        if(!userId || !productId)
            return response.status(400).json({
                success:false,
                message:'data not provided'
        })

        const cart = await Cart.findOne({userId}).populate({
            path:'items.productId',
            select:'image title price salePrice'
        })
        if(!cart){
            return response.status(404).json({
                success:false,
                message:'cart not found'
            })    
        }

        cart.items = cart.items.filter(item=> item.productId._id.toString()!==productId);

        await cart.save();
        await cart.populate({
            path:'items.productId',
            select:'image title price salePrice',
        })
        const populateCartItems = cart.items.map(item=>({
            productId:item.productId ? item.productId._id : null,
            image:item.productId ? item.productId.image : null,
            title:item.productId ? item.productId.title : null,
            price:item.productId ? item.productId.price : null,
            salePrice:item.productId ? item.productId.salePrice: null,
            quantity:item.quantity
        }))
        response.status(200).json({
            success:true,
            data:{
                ...cart._doc,
                items:populateCartItems
            },
            message:'Deleted Successfully!'
        })
    }catch(error){
        console.log(error);
        response.status(500).json({
            success:false,
            message:'something went wrong'
        })
    }
}

