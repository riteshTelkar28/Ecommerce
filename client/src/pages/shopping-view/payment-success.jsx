import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccess(){
    const navigate = useNavigate()
    return(
        <Card>
            <CardHeader>
                <CardTitle>
                    Payment Success !!
                </CardTitle>
            </CardHeader>
            <Button onClick={()=>navigate('/shop/account')} >View Orders</Button>
        </Card>
    )
}

export default PaymentSuccess;