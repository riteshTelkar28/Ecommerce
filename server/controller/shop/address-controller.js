import Address from "../../model/Address.js"


export const addAddress = async(request,response)=>{
    try{
        const {userId,address,city,pincode,phone,notes} = request.body;

        if(!userId || !address || !city || !pincode || !phone){
            return response.status(400).json({
                success:false,
                message:'Invalid data provided'
            })
        }

        const newlyCreatedAddress = new Address({
            userId,address,city,pincode,notes,phone
        })

        await newlyCreatedAddress.save();
        response.status(200).json({
            success:true,
            data:newlyCreatedAddress
        })
    }catch(error){
        console.log(error)
        response.status(500).json({
            success:false,
            message:'error'
        })
    }
}

export const fetchAllAddress = async(request,response)=>{
    try{
        const {userId} = request.params;
        if(!userId){
            return response.status(400).json({
                success:false,
                message:'user id required'
            })
        }

        const addressList = await Address.find({userId})

        response.status(200).json({
            success:true,
            data:addressList
        })

    }catch(error){
        console.log(error)
        response.status(500).json({
            success:false,
            message:'error'
        })
    }
}

export const editAddress = async(request,response)=>{
    try{

        const {userId,addressId} = request.params;
        const formData = request.body;
        console.log("form data ",formData);
        
        if(!userId || !addressId){
            return response.status(400).json({
                success:false,
                message:'user id or address id required'
            })
        }
        const address  = await Address.findOneAndUpdate({
            _id:addressId,
            userId
        },formData,{new:true});
        
        console.log("address ",address);
        
        if(!address){
            return  response.status(404).json({
                success:false,
                message:'Address not found'
            })
        }

        response.status(200).json({
            success:true,
            data:address
        })

    }catch(error){
        console.log(error)
        response.status(500).json({
            success:false,
            message:'error'
        })
    }
}

export const deleteAddress = async(request,response)=>{
    try{
        const {userId,addressId} = request.params;
        if(!userId || !addressId){
            return response.status(400).json({
                success:false,
                message:'user id or address id required'
            })
        }

        const address  = await Address.findByIdAndDelete({
            _id:addressId,
            userId
        });


        if(!address){
            return  response.status(404).json({
                success:false,
                message:'Address not found'
            })
        }
        response.status(200).json({
            success:true,
            data:address
        })

        
    }catch(error){
        console.log(error)
        response.status(500).json({
            success:false,
            message:'error'
        })
    }
}