import { Dialog } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useEffect, useState } from "react";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetails } from "@/store/admin/order-slice";
import { resetOrderDetailsForAdmin } from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView(){
    const {orderList,orderDetails} = useSelector(state=>state.adminOrder);
    console.log("ordre list admin", orderList);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllOrdersForAdmin())
    },[dispatch])
    const [openDetailsDialog,setOpenDetailsDialog] = useState(false)

    useEffect(()=>{
        if(orderDetails !== null) setOpenDetailsDialog(true)
    },[orderDetails])

    function fetchOrderDetails(getId){
        dispatch(getOrderDetails(getId))
    }
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
                                 'bg-red-600' : 'bg-blue-600'} `}  >{orderItem?.orderStatus}</Badge>
                            </TableCell>
                            <TableCell>${orderItem?.totalAmount}</TableCell>
                            <TableCell>
                                <Dialog open={openDetailsDialog}
                                onOpenChange={
                                    ()=>{setOpenDetailsDialog(false)
                                    dispatch(resetOrderDetailsForAdmin())}
                                }>
                                    <Button onClick={()=>fetchOrderDetails(orderItem?._id)} >View Details</Button>
                                    <AdminOrderDetailsView orderDetails={orderDetails}/>
                                </Dialog>
                            </TableCell>
                        </TableRow> 
                        ))
                    }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>    )
}

export default AdminOrdersView;
