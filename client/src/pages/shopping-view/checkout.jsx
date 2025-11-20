import React, { useState } from "react"
import img from '../../assets/account.jpg'
import Address from "@/components/shopping-view/address"
import { useDispatch, useSelector } from "react-redux"
import UserCartItemsWrapper from "@/components/shopping-view/cart-items-content"
import { Button } from "@/components/ui/button"
import { createNewOrder } from "@/store/shop/order-slice"
import { ThreeDots } from "react-loader-spinner"
import { toast } from "sonner"
function ShoppingCheckout(){
    const dispatch = useDispatch()
    const [currentSelectedAddress,setCurrentSelectedAddress] = useState(null)
    const [isPaymentStart,setIsPaymentStart] = useState(false)
    const {cartItems} = useSelector(state=>state.shopCart)
    // console.log("cartItems ",cartItems);
    const {approvalURL,isLoading} = useSelector(state=>state.shopOrder)
    const {user} = useSelector(state=>state.auth)
        const totalAmount = cartItems && cartItems?.items?.length ? cartItems.items.reduce(
        (sum,eachItem)=> sum + (eachItem?.salePrice < eachItem?.price ? eachItem?.salePrice : eachItem?.price)* eachItem?.quantity,
        0
    ) : 0

    // console.log("current address ",currentSelectedAddress )

    function handleInitialPaypalPayment(){
        if(cartItems?.items?.length===0){
            toast('Cart is empty',{
                style:{
                    backgroundColor:'red',
                    color:'white'
                }
            })
            return;
        }
        if(currentSelectedAddress===null){
            toast('Select Address',{
                style:{
                    backgroundColor:'red',
                    color:'white'
                }
            })
            return;
        }
        const orderData = {
                userId:user?.id,
                cartId: cartItems?._id,
                cartItems:cartItems?.items?.map(singleItem => ({
                    productId:singleItem.productId,
                    title:singleItem.title,
                    image:singleItem.image,
                    price:singleItem.saleprice < singleItem.price ? singleItem.salePrice : singleItem.price,
                    quantity:singleItem.quantity
                })),
                addressInfo:{
                    addressId:currentSelectedAddress?._id,
                    address:currentSelectedAddress?.address,
                    city:currentSelectedAddress?.city,
                    pincode:currentSelectedAddress?.pincode,
                    phone:currentSelectedAddress?.phone,
                    notes:currentSelectedAddress?.notes
                },
                orderStatus:'pending',
                paymentMethod:'paypal',
                paymentStatus:'pending',
                totalAmount:totalAmount,
                orderDate: new Date(),
                orderUpdateDate : new Date(),
                paymentId : '',
                payerId : ''
        }

        // console.log("order data ",orderData)
        dispatch(createNewOrder(orderData)).then((data)=>{
            // console.log(data)
            if(data?.payload?.success){
                setIsPaymentStart(true)
            }else{
                setIsPaymentStart(false)
            }
        })
    }

    if(approvalURL){
        window.location.href = approvalURL
    }
    return(
        <div className="flex flex-col ">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img src={img} 
                className="h-full w-full object-cover object-center"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
                <Address selectedId={currentSelectedAddress?._id} setCurrentSelectedAddress={setCurrentSelectedAddress} />
                <div className="flex flex-col gap-4">
                    {
                        cartItems && cartItems?.items?.length>0 ?
                            cartItems.items.map(cartItem => <UserCartItemsWrapper cartItem={cartItem} />)
                        : null
                    }
                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between">
                            <span className="font-bold">Total</span>
                            {
                                <span className="font-extrabold ">${totalAmount}</span>
                            }
                        </div>
                    </div>
                    <div className="mt-4 w-full">
                        <Button className={'w-full'} onClick={handleInitialPaypalPayment} >{isLoading ? <ThreeDots height={'40px'} width={'40px'} color="white" />: isPaymentStart ? 'Processing with paypal...' : 'Checkout with paypal' }</Button>
                    </div>
                </div>

            </div> 
        </div>
    )
}

export default ShoppingCheckout