import paypal from "../../helpers/paypal.js";
import Order from "../../model/Order.js";
import Cart from "../../model/Cart.js";
import Product from "../../model/Product.js";

export const createOrder = async(request,response)=>{
    try{
        const {userId,cartItems,addressInfo,orderStatus,
    paymentMethod,
    paymentStatus,
    totalAmount,
    orderDate,
    orderUpdateDate,
    paymentId,
    payerId,
    cartId
    } =  request.body;
    // console.log(request.body);

const items = cartItems.map(item => ({
  name: item.title,
  sku: String(item.productId),
  price: item.price.toFixed(2), // use salePrice, not price
  currency: 'USD',
  quantity: item.quantity
}));

// console.log("items ",items);
// console.log("items is array);

    var create_payment_json={
        intent:'sale',
        payer:{
            payment_method :'paypal'
        },
        redirect_urls:{
            return_url : 'http://localhost:5173/shop/paypal-return',
            cancel_url : 'http://localhost:5173/shop/paypal-cancel'
        },
        transactions:[
            {
                item_list:{
                    items:items
                },
                amount:{
                  currency:'USD',
                  total:items.reduce(
                    (sum, i) => sum + parseFloat(i.price) * i.quantity,0).toFixed(2)
                },
                description:'description'
            }
        ]
    }

    // console.log(JSON.stringify(create_payment_json))

    paypal.payment.create(create_payment_json,async(error,paymentInfo)=>{
        if(error){
            // console.log("error ",error.response.details);
            return response.status(500).json({
                success:false,
                message:'error while creating paypal payment'
            })
        }else{
            const newlyCreatedOrder = new Order({
                userId,
                cartItems,
                addressInfo,
                orderStatus,
                paymentMethod,
                paymentStatus,
                totalAmount,
                orderDate,
                orderUpdateDate,
                paymentId,
                payerId,
                cartId
            })

            await newlyCreatedOrder.save();
            const approvalURL = paymentInfo.links.find(link=> link.rel === 'approval_url').href;

            response.status(201).json({
                success:true,
                approvalURL,
                orderId:newlyCreatedOrder._id
            })
        }
    })


    }catch(error){
        console.log(error);
        response.status(500).json({
            success:false,
            message:"error while adding order"
        })
        
    }
}

export const capturePayment = async(request,response)=>{
    try{
        const {paymentId,payerId,orderId} = request.body;

        let order = await Order.findById(orderId);

        if(!order){
            return response.status(404).json({
                success:false,
                message:'order can not be found'
            })
        }

        order.paymentStatus = 'paid';
        order.orderStatus = 'confirmed';
        order.paymentId = paymentId;
        order.payerId = payerId;

        for(let item of order.cartItems){
            let product = await Product.findById(item.productId);
            
            if(!product){
                return response.status(404).json({
                    success:false,
                    message:'Not enough stock for this product'
                })
            }

            product.totalStock -= item.quantity;
            await product.save()
        }
        const getCardId = order.cartId;
        await Cart.findByIdAndDelete(getCardId);
        response.status(200).json({
            success:true,
            message:'Order Confirmed',
            data:order
        })
        await order.save();
    }catch(error){
        console.log(error);
        response.status(500).json({
            success:false,
            message:"error while adding order"
        })
        
    }
}

export const getAllOrdersByUser = async(request,response)=>{
    try{
        console.log("in getAllOrdersByUser")
        const {userId} = request.params;
        console.log("userId ----",userId)
                
        const orders = await Order.find({userId});

        if(!orders.length){
            return response.status(404).json({
                success:false,
                message:'No orders found!'
            })
        }

        response.status(200).json({
            success:true,
            data:orders
        })

    }catch(error){
        console.log(error)
        response.status(500).json({
            success:false,
            message:'Something Went Wrong'
        })
    }
}

export const getOrderDetails = async(request,response)=>{
    try{
        const {id} = request.params;
        const order = await Order.findById(id);

        if(!order)
            return response.status(404).json({
                success:false,
                message:'Order not found'
            })
        
        response.status(200).json({
            success:true,
            data:order
        })
    }catch(error){
        console.log(error)
        response.status(500).json({
            success:false,
            message:'cannot get orders'
        })
    }
}