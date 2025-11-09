import paypal from "../../helpers/paypal.js";
import Order from "../../model/Order.js";
 
export const createOrder = async(request,response)=>{
    try{
        const {userId,cartItems,addressInfo,orderStatus,
    paymentMethod,
    paymentStatus,
    totalAmount,
    orderDate,
    orderUpdateDate,
    paymentId,
    payerId
    } =  request.body;
    // console.log(request.body);

const items = cartItems.map(item => ({
  name: item.title,
  sku: String(item.productId),
  price: item.price.toFixed(2), // use salePrice, not price
  currency: 'USD',
  quantity: item.quantity
}));

console.log("items ",items);
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
                    items:{items}
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

    console.log(JSON.stringify(create_payment_json))

    paypal.payment.create(create_payment_json,async(error,paymentInfo)=>{
        if(error){
            console.log("error ",error.response.details);
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
                payerId
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

    }catch(error){
        console.log(error);
        response.status(500).json({
            success:false,
            message:"error while adding order"
        })
        
    }
}