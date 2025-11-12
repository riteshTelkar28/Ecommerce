import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Cart from "../../model/Cart.js";
import Product from "../../model/Product.js";

export const handleImageUpload = async(request,response)=>{
    try{
        // console.log(request.file)
        const b64 = Buffer.from(request.file.buffer).toString('base64');
        const url = "data:"+request.file.mimetype+';base64,'+b64
        const result = await imageUploadUtil(url);
        response.json({
            success:true,
            result
        })
    }catch(error){
        console.log("error ",error)
        response.json(
            {
                success:false,
                message:'error while image upload'
            }
        )
    }
}

export const addProduct = async(request,response)=>{
    try{
        const {image,title,description,category,brand,price,salePrice,totalStock} = request.body

        const newlyCreatedProduct = new Product({
            image,title,description,category,brand,price,salePrice,totalStock
        })

        await newlyCreatedProduct.save();
        response.status(201).json({
            success:true,
            data:newlyCreatedProduct,
            message:'Product Added Successfully'

        })
    }catch(error){
        console.log(error)
        response.status(500).json({
            success:false,
            message:'error occuered'
        })
    }
}

export const fetchProduct = async(request,response)=>{
    try{
        const listOfProducts = await Product.find();
        response.status(200).json({
            success:true,
            data:listOfProducts
        })
    }catch(error){
        console.log(error)
        response.status(500).json({
            success:false,
            message:'error occuered'
        })
    }
}

export const editProduct = async(request,response)=>{
    try{
        const {id} = request.params
        console.log("id ",id)
        const {image,title,description,category,brand,price,salePrice,totalStock} = request.body 

        const findProduct = await Product.findById(id)

        if(!findProduct) return response.status(404).json({
            success:false,
            message:"not found"
        })

        findProduct.image = image || findProduct.image
        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.price = price || findProduct.price
        findProduct.salePrice = salePrice || findProduct.salePrice
        findProduct.totalStock = totalStock || findProduct.totalStock
        
        // console.log(findProduct)
        await findProduct.save()
        response.status(201).json({
            success:true,
            data:findProduct,
            message:'Product Updated Successfully'
        })

    }catch(error){
        console.log(error)
        response.status(500).json({
            success:false,
            message:'error occuered'
        })
    }
}

export const deleteProduct = async(request,response)=>{
    try{
        const {id} = request.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product) return response.status(404).json({
            success:false,
            message:"not found"
        })

        const deletedProduct = await Cart.updateMany(
            {},
            {
                $pull : {items:{_id:id}}
            }
        )

        // console.log("deleted Product ",deleteProduct);
        
        response.status(200).json({
            success:true,
            message:'Product Deleted Successfully!'
        })

    }catch(error){
        console.log(error)
        response.status(500).json({
            success:false,
            message:'error occuered'
        })
    }
}
