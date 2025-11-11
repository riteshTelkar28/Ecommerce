import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ShoppingOrderDetails from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser, getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders(){
    const [openDetailsDialog,setOpenDetailsDialog] = useState(false)
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const {orderList,orderDetails} = useSelector(state=>state.shopOrder);

    function fetchOrderDetails(id){
        dispatch(getOrderDetails(id))
    }

    useEffect(()=>{
        dispatch(getAllOrdersByUser(user?.id))
    },[dispatch])

    useEffect(()=>{
        if(orderDetails !== null) setOpenDetailsDialog(true)
    },[orderDetails])

    
    // console.log("order details ",orderDetails)
    return(
        <Card>
            <CardHeader>
                <CardTitle>
                    Order History
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order Id</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {
                        orderList && orderList.map((orderItem)=>
                        (
                        <TableRow>
                            <TableCell>{orderItem?._id}</TableCell>
                            <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
                            <TableCell>
                                <Badge className={`py-1 px-3 ${orderItem?.orderStatus==='confirmed' ?
                                 'bg-green-500':
                                 orderItem?.orderStatus == 'rejected' ?
                                 'bg-red-600' : 'bg-blue-600'} `} >{orderItem?.orderStatus}</Badge>
                            </TableCell>
                            <TableCell>${orderItem?.totalAmount}</TableCell>
                            <TableCell>
                                <Dialog open={openDetailsDialog}
                                onOpenChange={
                                    ()=>{setOpenDetailsDialog(false)
                                    dispatch(resetOrderDetails())}
                                }>
                                    <Button onClick={()=>fetchOrderDetails(orderItem?._id)} >View Details</Button>
                                    <ShoppingOrderDetails orderDetails={orderDetails}/>
                                </Dialog>
                            </TableCell>
                        </TableRow> 
                        ))
                    }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default ShoppingOrders;
