import ProductImageUpload from "@/components/admin-view/image-upload"
import CommonForm from "@/components/common/form"
import { addProductFormElements } from "@/components/config"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import React, { Fragment, useState } from "react"

const initialFormData = {
    image:null,
    title:'',
    description:'',
    category:'',
    brand:'',
    price:'',
    salesPrice:'',
    totalStock:''
}
function AdminProducts(){
    const [formData,setFormData] = useState(initialFormData)
    const [openCreateProductDialog,setOpenCreateProductDiaglog] = useState(false)
    const [imageFile,setImageFile] = useState(null)
    const  [uploadedImageUrl,setUploadedImageUrl] = useState('')
    const [imageLoadingState,setImageLoadingState]=useState(false)
 
    function onSubmit(){

    }
    return <Fragment>
        <div className="mb-5 w-full flex justify-end">
            <Button onClick={()=>setOpenCreateProductDiaglog(true)}>Add new Product</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
        <Sheet open={openCreateProductDialog} onOpenChange={()=>{
            setOpenCreateProductDiaglog(false);
        }}>
            <SheetContent side="right" className='overflow-auto bg-white'>
                <SheetHeader>
                    <SheetTitle>Add Product</SheetTitle>
                </SheetHeader>
                
                <div className="px-6 py-6">
                    <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}
                    setImageLoadingState={setImageLoadingState} />
                    <CommonForm
                        formControls={addProductFormElements}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText='Add'
                        onSubmit={onSubmit}
                    />
                </div>
            </SheetContent>
        </Sheet>
    </Fragment>
}

export default AdminProducts