import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsWrapper from "./cart-items-content";

function UserCartWrapper({cartItems}){
    return(
        <SheetContent className='bg-white sm:max-w-md '>
            <SheetHeader>
                <SheetTitle>
                    Your cart
                </SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4 ">
                {
                    cartItems && cartItems?.items?.length > 0 && cartItems?.items?.map((item)=><UserCartItemsWrapper cartItem={item} />)
                }
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">$1000</span>
                </div>
            </div>
            <Button className='w-full'>
                 Checkout
            </Button>
        </SheetContent>
    )
}

export default UserCartWrapper;