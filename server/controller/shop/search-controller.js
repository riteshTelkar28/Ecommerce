import Product from '../../model/Product.js'
export const searchProducts = async(request,response)=>{
    try{

        const {keyword} = request.params;
        // console.log("params ",keywords);
        
        if(!keyword || typeof keyword !== 'string'){
            return response.status(404).json({
                success:false,
                message:'Keyword required'
            })
        }

        const regEx = new RegExp(keyword,'i');
        const createSearchQuery = {
            $or : [
                {title:regEx},
                {description:regEx},
                {category:regEx},
                {brand:regEx},
                
            ]
        }
        // console.log("  keywor ",keyword);
        
        const searchResults = await Product.find(createSearchQuery)
        // console.log("search result ",searchResults);
        
        response.status(201).json({
            success:true,
            data:searchResults
        })
    }catch(error){
        console.log(error);
        response.status(500).json({
            success:false,
            message:'Something went wrong'
        })
    }
}