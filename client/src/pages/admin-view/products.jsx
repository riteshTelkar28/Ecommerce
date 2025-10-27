import ProductImageUpload from "@/components/admin-view/image-upload"
import AdminProductTile from "@/components/admin-view/product-tile"
import CommonForm from "@/components/common/form"
import { addProductFormElements } from "@/components/config"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { addNewProducts, editProduct, fetchAllProducts } from "@/store/admin/product-slice"
import React, { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"

const initialFormData = {
    image:null,
    title:'',
    description:'',
    category:'',
    brand:'',
    price:'',
    salePrice:'',
    totalStock:''
}
function AdminProducts(){
    const [formData,setFormData] = useState(initialFormData)
    const [openCreateProductDialog,setOpenCreateProductDiaglog] = useState(false)
    const [imageFile,setImageFile] = useState(null)
    const  [uploadedImageUrl,setUploadedImageUrl] = useState('')
    const [imageLoadingState,setImageLoadingState]=useState(false)
    const [currentEditId,setCurrentEditId] = useState(null)
    const dispatch = useDispatch()
    const productList = useSelector(state => state.adminProducts.productList)

    // console.log("products ",productList);
    // console.log("isEditMode ",currentEditId)
    
    function onSubmit(event){
        event.preventDefault();
        // console.log("form data ",formData)
        currentEditId !== null ?
        dispatch(editProduct({
            id:currentEditId,
            formData
        })).then((data)=>{
            // console.log("updated Data ",data)
            if(data?.payload?.success){
                dispatch(fetchAllProducts())
                setOpenCreateProductDiaglog(false)
                setImageFile(null);
                setFormData(initialFormData);
                toast(data.payload.message,{
                    style:{color:'green'}
                })
                setOpenCreateProductDiaglog(false)
            }            
        }) 
        : 
        dispatch(addNewProducts({
            ...formData,
            image:uploadedImageUrl
        })).then((data)=>{
            console.log("added data ",data);
            
            if(data?.payload?.success){
                dispatch(fetchAllProducts())
                setOpenCreateProductDiaglog(false)
                setImageFile(null);
                setFormData(initialFormData);
                toast('Product added Successfully')
                setOpenCreateProductDiaglog(false)
            }
        });
        
    }


    useEffect(()=>{
        dispatch(fetchAllProducts())
    },[dispatch])
    return <Fragment>
        <div className="mb-5 w-full flex justify-end">
            <Button onClick={()=>setOpenCreateProductDiaglog(true)}>Add new Product</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {
                productList.length > 0 ?
                productList.map(productItem => <AdminProductTile setCurrentEditId={setCurrentEditId} setOpenCreateProductDiaglog={setOpenCreateProductDiaglog} setFormData={setFormData} product={productItem} />) :
                null
            }
        </div>
        <Sheet open={openCreateProductDialog} onOpenChange={()=>{
            setOpenCreateProductDiaglog(false);
            setCurrentEditId(null);
            setFormData(initialFormData)
        }}>
            <SheetContent side="right" className='overflow-auto bg-white'>
                <SheetHeader>
                    <SheetTitle>
                        {
                            currentEditId !== null ?
                            'Edit Product' :
                            'Add Product'
                        }
                    </SheetTitle>
                </SheetHeader>
                
                <div className="px-6 py-6">
                    <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}
                    setImageLoadingState={setImageLoadingState} 
                    imageLoadingState={imageLoadingState}
                    isEditMode = {currentEditId !== null}
                    />
                    <CommonForm
                        formControls={addProductFormElements}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={currentEditId !== null ? 'Update Product' :'Add Product'}
                        onSubmit={onSubmit}
                    />
                </div>
            </SheetContent>
        </Sheet>
    </Fragment>
}

export default AdminProducts