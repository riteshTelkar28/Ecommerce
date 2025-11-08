import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsWrapper from "./cart-items-content";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function UserCartWrapper({cartItems,setOpenCartSheet}){

    const navigate = useNavigate()
    // console.log("cart items in wrapper ",cartItems.items);
    const totalAmount = cartItems && cartItems?.items?.length ? cartItems.items.reduce(
        (sum,eachItem)=> sum + (eachItem?.salePrice < eachItem?.price ? eachItem?.salePrice : eachItem?.price)* eachItem?.quantity,
        0
    ) : 0
    
    const {isLoading } = useSelector(state=>state.shopCart)
    // console.log("isLoading ",isLoading);
    

    // console.log("total ",totalAmount);
    
    return(
        <SheetContent className='bg-white sm:max-w-md '>
            <SheetHeader>
                <SheetTitle>
                    Your cart
                </SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4 ">
                {
                    cartItems && cartItems?.items?.length > 0 && cartItems?.items?.map((item)=><UserCartItemsWrapper  cartItem={item} />)
                }
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    {
                        isLoading ? <ThreeDots height='20px' width='30px' color="#4fa94d" /> : <span className="font-bold">${totalAmount}</span>
                    }
                </div>
            </div>
            <Button onClick={()=>{
                navigate('/shop/checkout')
                setOpenCartSheet(false)
            }}  className='w-full'>
                 Checkout
            </Button>
        </SheetContent>
    )
}

export default UserCartWrapper;