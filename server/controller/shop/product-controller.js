import Product from "../../model/Product.js"

export const fetchFilteredProduct = async(request,response)=>{
    try{
        const {category=[],brand=[],sortBy="price-lowtohigh"
        } = request.query; 
        let filters = {};

        if(category.length){
            filters.category = {$in :category.split(',')}
        }

        if(brand.length){
            filters.brand = {$in :brand.split(',')}
        }

        let sort = {}
        switch(sortBy){
            case 'price-lowtohigh':
                sort.price = 1
                break;
            case 'price-hightolow':
                sort.price = -1
                break;
            case 'title-atoz':
                sort.title = 1
                break;
            case 'title-ztoa':
                sort.title = -1
                break;
            default:
                sort.price = 1
            
        }
        
        const productList = await Product.find(filters).sort(sort);
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
            message:'something went wrong'
        })
    }
}

export const getProductDetails = async(request,response)=>{
    try{
        const {id} = request.params;
        // console.log(id);
        
        const res = await Product.findOne({_id:id});
        // console.log(res);
        
        if(!res){
            response.status(400).json({
                success:false,
                message:"not found"
            })
        }

        response.status(200).json({
            success:true,
            data:res
        })

    }catch(error){
        console.log(error)
        response.status(500).json({
            success:false,
            message:'something went wrong'
        })
    }
}
