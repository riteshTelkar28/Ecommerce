import { brandOptionsMap, categoryOptionsMap } from "@/components/config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";

function ShoppingProductTile({product,handleProductDetails,handleAddToCart}){
    const {isLoading,productId} = useSelector(state=>state.shopCart)

    // console.log(`${product.title}`,(product._id == productId))
    

    return(
        <Card className='w-full max-w-sm mx-auto '>
            <div onClick={()=>handleProductDetails(product?._id)}>
                <div className="relative ">
                    <img src={product.image} alt={product.title} className="w-full h-[300px]  object-cover rounded-t-lg" />
                    {
                        product?.salePrice > 0 ? 
                        <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>Sale</Badge> : null
                    }
                </div>
                <CardContent className='p-4'>
                    <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">{categoryOptionsMap[product?.category]}</span>
                        <span className="text-sm text-muted-foreground">{brandOptionsMap[product?.brand]}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className={` ${product?.salePrice > 0 ? 'line-through' : ''} 'text-lg font-semibold text-primary`}>{product?.price}</span>
                        {
                            product?.price > 0 ?
                            <span className="text-lg font-semibold text-primary">{product?.salePrice}</span> :
                            null
                        }
                    </div>
                </CardContent>

            </div>
            <CardFooter>
                        <Button className='w-full hover:bg-gray-600' onClick={()=>handleAddToCart(product._id)}>
                            {
                                isLoading && (product._id==productId) ? <ThreeDots height='40px' width='40px'color="white"  /> : 'Add To Cart'
                            }
                        </Button>
            </CardFooter>
        </Card>
    )
}

export default ShoppingProductTile;