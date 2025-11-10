import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";


function ShoppingOrderDetails({orderDetails}){
    const {user} = useSelector(state=>state.auth)
    return(
        <DialogContent  className='sm:max-w-[600px]  bg-white'>
            <div className="grid gap6 mt-2">
                <div className="grid gap-2">
                    <div className="flex mt2 items-center justify-between">
                        <p className="font-medium">Order Id</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>
                    <div className="flex mt2 items-center justify-between">
                        <p className="font-medium">Order Date</p>
                        <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
                    </div>
                    <div className="flex mt2 items-center justify-between">
                        <p className="font-medium">Order Status</p>
                        <Label>
                                    <Badge className={`py-1 px-3 ${orderDetails?.orderStatus==='confirmed' ? 'bg-green-500':'bg-red-600'}`} >{orderDetails?.orderStatus}</Badge>
                        </Label>
                    </div>
                    <div className="flex mt2 items-center justify-between">
                        <p className="font-medium">Order Price</p>
                        <Label>${orderDetails?.totalAmount}</Label>
                    </div>
                    
                </div>
                <Separator  className={'bg-black'} />
                <div className="grid gap-4 mt-2">
                    <div className="grid gap-2">
                        <div className="font-medium">Order Details</div>
                        <ul className="grid gap-3">
                        {
                            orderDetails?.cartItems.map((eachItem)=>(
                                <li className="flex items-center justify-between">
                                <span>{eachItem?.title}</span>
                                <span>${eachItem?.price}</span>
                            </li>
                            ))
                        } 
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4 mt-2">
                    <div className="grid gap-2">
                        <div className="font-medium">Shipping Info</div>
                        <div className="grid gap-0.5 ">
                            <span>{user?.userName}</span>
                            <span>{orderDetails?.addressInfo?.address}</span>
                            <span>{orderDetails?.addressInfo?.city}</span>
                            <span>{orderDetails?.addressInfo?.city}</span>
                            <span>{orderDetails?.addressInfo?.phone}</span>
                            <span>{orderDetails?.addressInfo?.pincode}</span>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}

export default ShoppingOrderDetails;