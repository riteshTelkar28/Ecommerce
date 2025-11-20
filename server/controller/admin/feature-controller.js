import Feature from "../../model/Feature.js";

export const addFeatureImage = async(request,response)=>{
    try{
        const {image} = request.body;
        console.log("image ",image);
        
        const featureImages = new Feature({
            image
        })

        // console.log("feature images ",featureImages);
        
        await featureImages.save();
        response.status(200).json({
            success:true,
            data:featureImages
        })
    }catch(error){
        console.log(error);
        response.status(500).json({
            success:false,
            message:'Something went wrong'
        })
    }
}

export const getFeatureImage = async(request,response)=>{
    try{
        const images = await Feature.find()
        response.status(200).json({
            success:true,
            data:images
        })
    }catch(error){
        console.log(error);
        response.status(500).json({
            success:false,
            message:'Something went wrong'
        })
    }
}

