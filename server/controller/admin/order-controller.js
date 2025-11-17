import Order from "../../model/Order.js";

export const getAllOrdersForAdmin = async(request,response)=>{
    try{
                
        const orders = await Order.find({});

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
            message:'cannot get orders'
        })
    }
}


export const updateOrderStatus= async(request,response)=>{
    try{
        const {id} = request.params;
        const {orderStatus} = request.body;
        // console.log('order status ',orderStatus);
        
        const orders = await Order.findById(id);
        // console.log("orders ",orders);
        
        if(!orders){
            return response.status(404).json({
                success:false,
                message:'No orders found!'
            })  
        }

        const result = await Order.findByIdAndUpdate(id,{orderStatus});
        console.log("result ",result);
        
        response.status(200).json({
            success:true,
            message:'Updated Successfully!',
            data:result
        })

    }catch(error){
        console.log(error)
        response.status(500).json({
            success:false,
            message:'cannot get orders'
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