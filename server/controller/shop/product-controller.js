import Product from "../../model/Product.js"

export const fetchFilteredProduct = async(request,response)=>{
    try{
        const productList = await Product.find();
        if(productList){
            response.status(200).json({
                success:true,
                data:productList
            })
        }
    }catch(error){
        console.log(error)
        response.status(500).json({
            success:false,
            message:'something went wrond'
        })
    }
}