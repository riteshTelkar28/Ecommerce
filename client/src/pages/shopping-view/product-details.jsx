import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { setProductDetails } from "@/store/shop/product-slice";
import { StarIcon } from "lucide-react";
import { useDispatch } from "react-redux";


function ProductDetailsDialog({open,setOpen,productDetails}){
    const dispatch = useDispatch()
    function handleDialogClose(){
        setOpen(false);
        dispatch(setProductDetails())
    }
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
                    <div>
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
                        <Button className='w-full'>Add to Cart</Button>
                    </div>
                    <Separator className='bg-black' />
                    <div className="max-h-[300px] overflow-auto">
                        <h2 className="text-3xl font-bold mb-4">Review</h2>
                        <div className="grid gap-6">
                            <div className="flex gap-4">
                                <Avatar className='w-10 h-10 border' >
                                    <AvatarFallback>RT</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">Ritesh Telkar</h3>
                                    </div>
                                    <div className="flex items-center gap-0.5" >
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                    </div>

                                    <p className="text-muted foreground">This is an product</p>
                                </div>
                            </div>
                            

                        </div>

                    </div>
                    
                    <div className="mt-6 flex gap-2">
                        <Input placeholder="Write a review" />
                        <Button>Submit</Button>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailsDialog;