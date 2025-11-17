import StarRatingComponent from "@/components/common/star-rating";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { setProductDetails } from "@/store/shop/product-slice";
import { addReview, getReview } from "@/store/shop/review-slice";
import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";


function ProductDetailsDialog({open,setOpen,productDetails,handleAddToCart}){
    // console.log("productDetails ",productDetails);
    const {isLoading} = useSelector(state=>state.shopCart)
    const {user} = useSelector(state=>state.auth)
    const {reviews} = useSelector(state=>state.review)
    const [reviewMsg,setReviewMsg] = useState('')
    const [rating,setRating] = useState(0)
    const dispatch = useDispatch()
    function handleDialogClose(){
        setOpen(false);
        dispatch(setProductDetails())
        setRating(0)
        setReviewMsg('')
    }

    function handleRatingChange(getRating){
        setRating(getRating)
    }

    function handleAddReview(){
        dispatch(addReview({
                productId:productDetails._id,
                userId:user.id,
                userName:user.userName,
                reviewMessage:reviewMsg,
                reviewValue:rating
        })).then((data)=>{
            dispatch(getReview(productDetails._id))
            if(data?.payload?.success){
                toast(data?.payload?.message,{
                    style:{
                        color:'green',
                        backgroundColor:'white'
                    }
                })
                
            }else{
                toast(data.payload.message,{
                    style:{
                        color:'black',
                        backgroundColor:'red'
                    }
                })                
            }
        })
    }

    useEffect(()=>{
        if(productDetails!==null) dispatch(getReview(productDetails._id))
    },[productDetails])

    // console.log("review ",reviews)
    return(
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className='grid grid-cols-2 gap-6 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] bg-white'>
                <div className="relative overflow-hidden rounded-lg">
                    <img 
                        src={productDetails?.image}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover"
                    />
                </div>
                <div>
                    <div>``
                        <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                        <p className="text-muted-foreground mb-5 mt-4">{productDetails?.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className={`text-3xl font-bold ${productDetails?.salePrice < productDetails?.price ? 'line-through':'' }`}>${productDetails?.price}</p>

                        {
                            productDetails?.salePrice > 0 ? <p className="text-2xl font-bold">{productDetails?.salePrice}</p> : ''
                        }
                    </div>
                    <div className="flex items-center gap-0.5 mt-2" >
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                    </div>
                    
                    <div className="mt-5 mb-5 ">
                        <Button className='w-full' 
                        onClick = {()=>handleAddToCart(productDetails?._id,productDetails?.totalStock)}
                        >
                            {
                                isLoading  ? <ThreeDots height='40px' width='40px'color="white"  /> : 'Add To Cart'
                            }
                            
                        </Button>
                    </div>
                    <Separator className='bg-black' />
                    <div className="max-h-[300px] overflow-auto">
                        <h2 className="text-3xl font-bold mb-4">Review</h2>
                        <div className="grid gap-6">
                            {
                                reviews && reviews.length > 0 ?
                                reviews.map((reviewItem)=>
                            <div className="flex gap-4">
                                <Avatar className='w-10 h-10 border' >
                                    <AvatarFallback>{reviewItem.userName[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                                    </div>
                                    <div className="flex items-center gap-0.5" >
                                        <StarRatingComponent rating={reviewItem.reviewValue} />
                                    </div>

                                    <p className="text-muted foreground">{reviewItem?.reviewMessage}</p>
                                </div>
                            </div>
                                ) : <h1>No Reviews</h1>

                            }
                        </div>

                    </div>
                    
                    <div className="mt-10 flex flex-col gap-2">
                        <Label>Write a review</Label>
                        <div className="flex ">
                            <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange}/>
                        </div>
                        <Input name='reviewMessage' value={reviewMsg} onChange={(event)=>setReviewMsg(event.target.value)} placeholder="Write a review" />
                        <Button disabled={reviewMsg.trim()===""} onClick={handleAddReview} >Submit</Button>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailsDialog;