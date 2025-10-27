import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({imageFile,isEditMode,setImageFile,uploadedImageUrl,setUploadedImageUrl,setImageLoadingState,imageLoadingState}){
    const inputRef = useRef(null)

    function handleImageFileChange (event){
        console.log(event.target.files[0].name);
        const selectedFile = event.target.files[0];
        if(selectedFile) setImageFile(selectedFile)
        // console.log(imageFile);
        
        
    }

    function handleDragOver(event){
        event.preventDefault()

    }

    function handleDrop(event){
        event.preventDefault()
        const droppedFile = event.dataTransfer.files[0];
        if(droppedFile) setImageFile(droppedFile)
    }

    function handleRemoveImage(){
        setImageFile(null)
        if(inputRef.current){
            inputRef.current.value=""
        }
    }

    async function uploadImageToCloudinary(){
        setImageLoadingState(true)
        const data = new FormData()
        data.append('my_file',imageFile)
        const response = await axios.post('http://localhost:5000/api/admin/products/upload-image',data)
        // console.log("response ",response);
        if(response.data.success) {
            setUploadedImageUrl(response.data.result.url)
            setImageLoadingState(false)
        }
        
    }

    // console.log(imageFile)
    useEffect(()=>{
        if(imageFile!==null) uploadImageToCloudinary()
    },[imageFile])
    return(
        <div className="w-full max-w-md mx-auto" >
            <Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className={` ${isEditMode ? 'opacity-50' : ''} border-2 border-dashed rounded-lg p-4 mb-4`}>
                <Input
                 id='image-upload'
                 className='hidden'
                 type='file'  
                 ref={inputRef} 
                 onChange={handleImageFileChange} 
                 disabled = {isEditMode}
                 />
                {
                    !imageFile ?
                     <Label  className= {` ${isEditMode ? 'cursor-not-allowed' : ''} flex flex-col items-center justify-center h-32 cursor-pointer`} htmlFor='image-upload'>
                        <UploadCloudIcon className="w-10 h-10 mb-2" />
                        <span>Drag and drop or click to upload image</span>
                    </Label> :
                    imageLoadingState ?
                    <Skeleton className='h-10 bg-gray-100' />  :
                     <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FileIcon className="w-8 text-primary mr-2 h-8" />
                        </div>
                        <p className="text-sm font-medium">{imageFile.name}</p>
                        <Button variant='ghost' size='icon' className='text-muted-foreground hover:text-foreground' onClick={handleRemoveImage}>
                            <XIcon className="w-4 h-4"/>
                            <span className="sr-only">remove file</span>
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default ProductImageUpload;