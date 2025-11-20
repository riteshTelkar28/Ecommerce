import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editAddress, fetchAddress } from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { toast } from "sonner";


const initialAddressFormData = {
    address:'',
    city:'',
    phone:'',
    pincode:'',
    notes:''
}
function Address({setCurrentSelectedAddress,selectedId}){
    const [formData,setFormData] = useState(initialAddressFormData)

    const [currentAddressId,setCurrentAddressId] = useState(null)
    const dispatch = useDispatch();
    const {user} = useSelector(state =>state.auth);
    const {addressList} = useSelector(state =>state.shopAddress);
    

    function handleManageAddress(event){
        event.preventDefault();
        if(addressList.length >= 3 && currentAddressId===null){
            setFormData(initialAddressFormData)
            toast('You can add upto 3 addresses',
                {
                    style:{
                        color:'red',
                        background:'white',
                    }
                }
            )
            return ;
        }
        currentAddressId !== null ? dispatch(editAddress({userId:user?.id,addressId:currentAddressId,formData})).then((data)=>{
            if(data.payload?.success){
                dispatch(fetchAddress(user?.id))
                setCurrentAddressId(null);
                setFormData(initialAddressFormData)
                toast(data?.payload?.message,{
                    style:{
                        color:'green',
                        background:'white'
                    }
                })
            }
        }) : 
        dispatch(addNewAddress({
            ...formData,
            userId:user?.id
        })).then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchAddress(user?.id))
                setFormData(initialAddressFormData)
                toast(data?.payload?.message,{
                    style:{
                        color:'green',
                        background:'white'
                    }
                })

            }
        })
    } 

    // console.log("addressList ",addressList)

    function isFormValid(){
        return Object.keys(formData).map(key => formData[key].trim() !== '').every((item)=>item)
    }
    console.log(currentAddressId)

    function handleDeleteAddress(getCurrentAddress){
        
        dispatch(deleteAddress({userId:user?.id,addressId:getCurrentAddress?._id})).then((data)=>{
            if(data.payload?.success){
                dispatch(fetchAddress(user?.id))
                toast(data?.payload?.message,{
                    style:{
                        color:'red',
                        background:'white',
                    }
                })
            }
        })
    }

    function handleEditAddress(getCurrentAddress){
        setCurrentAddressId(getCurrentAddress?._id);
        setFormData({
            ...formData,
            address:getCurrentAddress?.address,
            city:getCurrentAddress?.city,
            phone:getCurrentAddress?.phone,
            pincode:getCurrentAddress?.pincode,
            notes:getCurrentAddress?.notes
        })
    }

    useEffect(()=>{
        dispatch(fetchAddress(user?.id))
    },[dispatch])
    return(
        <Card className='border-0'>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {
                    addressList && addressList.length > 0 ?
                    addressList.map(singleAddress=>
                    <AddressCard addressInfo={singleAddress} handleDeleteAddress={handleDeleteAddress}
                    handleEditAddress={handleEditAddress} 
                    setCurrentSelectedAddress={setCurrentSelectedAddress}
                    selectedId={selectedId}
                    />) : null
                }
            </div>
            <CardHeader>
                <CardTitle>{
                    currentAddressId !== null ? 'Edit  Address' : 'Add New Address'
                }</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
                <CommonForm
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={                    currentAddressId !== null ? 'Edit' : 'Add'}
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()}
                />
            </CardContent>
        </Card>
    ) 
}

export default Address;
