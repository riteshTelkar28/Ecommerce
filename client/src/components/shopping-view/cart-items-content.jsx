import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, updateToCart } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { Oval, ThreeDots } from "react-loader-spinner";


function UserCartItemsWrapper({cartItem}){
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    function handleItemDelete(getCurrentItem){
        dispatch(deleteFromCart({userId:user?.id,productId:getCurrentItem?.productId})).then((data)=>{
            if(data?.payload.success){
                toast('cart item deleted',{style:{color:'red',background:'white'}})
            }
        })
    }
    
    function handleUpdateQuantity(getCurrentItem,typeOfAction){
        console.log("item for updation ",getCurrentItem,typeOfAction)
        dispatch(updateToCart({userId:user?.id,productId:getCurrentItem?.productId,quantity:typeOfAction=='plus' ? getCurrentItem?.quantity+1 : getCurrentItem?.quantity -1 })).then((data)=>{
            if(data?.payload.success){
                toast('cart item updated',{style:{color:'green',background:'white'}})
            }
        })
    }
    return(
        <div className="flex items-center space-x-4">
            <img src={cartItem?.image} className="ml-2 w-20 h-20 rounded object-cover" />
            <div className="flex-1">
                <h3 className="font-extrabold">{cartItem?.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <Button variant='outline' className='h-8 w-8 rounded-full cursor-pointer' size='icon' onClick={()=>handleUpdateQuantity(cartItem,'minus')} >
                        <Minus className="w-4 h-4" />
                        <span className="sr-only">Decrease</span>
                        
                    </Button>
                    <span className="font-semibold">{cartItem?.quantity}</span>
                    <Button variant='outline' className='h-8 w-8 rounded-full cursor-pointer' size='icon' onClick={()=>handleUpdateQuantity(cartItem,'plus')} >
                        <Plus className="w-4 h-4" />
                        <span className="sr-only">Decrease</span>
                        
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="font-semibold">
                    ${((cartItem?.salePrice < cartItem?.salePrice ? cartItem?.salePrice : cartItem?.salePrice) * cartItem?.quantity).toFixed(2) }
                </p>
                <Trash  onClick={()=>handleItemDelete(cartItem)} className='h-4 w-4' size={20} />
            </div>
        </div>

    )
}

export default UserCartItemsWrapper;