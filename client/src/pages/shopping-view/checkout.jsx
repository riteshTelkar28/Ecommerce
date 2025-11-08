import React from "react"
import img from '../../assets/account.jpg'
import Address from "@/components/shopping-view/address"
import { useSelector } from "react-redux"
import UserCartItemsWrapper from "@/components/shopping-view/cart-items-content"
import { Button } from "@/components/ui/button"
function ShoppingCheckout(){
    const {cartItems} = useSelector(state=>state.shopCart)
    console.log("cart Items ",cartItems);
        const totalAmount = cartItems && cartItems?.items?.length ? cartItems.items.reduce(
        (sum,eachItem)=> sum + (eachItem?.salePrice < eachItem?.price ? eachItem?.salePrice : eachItem?.price)* eachItem?.quantity,
        0
    ) : 0
    return(
        <div className="flex flex-col ">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img src={img} 
                className="h-full w-full object-cover object-center"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
                <Address />
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
                        <Button className={'w-full'}>Checkout With Paypal</Button>
                    </div>
                </div>

            </div> 
        </div>
    )
}

export default ShoppingCheckout