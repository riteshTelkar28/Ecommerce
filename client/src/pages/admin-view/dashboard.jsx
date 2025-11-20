import ProductImageUpload from "@/components/admin-view/image-upload"
import { Button } from "@/components/ui/button"
import { addFeatureImage, getFeatureImage } from "@/store/common-slice"
import React, { useEffect, useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { useDispatch, useSelector } from "react-redux"

function AdminDashboard(){
    const [imageFile,setImageFile] = useState(null)
    const  [uploadedImageUrl,setUploadedImageUrl] = useState('')
    const [imageLoadingState,setImageLoadingState]=useState(false)
    const {featureImages,isLoading} = useSelector(state=>state.commonFeature)
    const dispatch  = useDispatch()
    function handleUploadFeatureImage(){
        dispatch(addFeatureImage(uploadedImageUrl)).then((data)=>{
        //   console.log("data ",data)
        if(data.payload.success){
            dispatch(getFeatureImage())
        }  
        })
    }

    useEffect(()=>{
        dispatch(getFeatureImage())
    },[dispatch])
    console.log('featureImages ',featureImages)
    return(
        <div>
            <h1>Upload Feature images</h1>
            <ProductImageUpload
             imageFile={imageFile}
             setImageFile={setImageFile} 
             uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}
             setImageLoadingState={setImageLoadingState} 
             imageLoadingState={imageLoadingState}
            // isEditMode = {currentEditId !== null}
            />
            <Button onClick={handleUploadFeatureImage} className={'mt-5 w-full'} >{isLoading ? <ThreeDots height={'40px'} width={'40px'} color="white" /> : 'Upload'}</Button>

            <div className="flex items-center gap-3 m-2">
                {
                    featureImages && featureImages.length ? 
                    featureImages.map((singleImage)=><div className="w-full h-[300px]">
                        <img src={singleImage.image} />
                        </div>) : ''
                }
            </div>
        </div>
    )
}

export default AdminDashboard