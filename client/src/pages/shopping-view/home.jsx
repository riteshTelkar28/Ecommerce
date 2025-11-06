import React, { useEffect, useState } from "react"
import banner1 from '../../assets/banner-1.webp'
import banner2 from '../../assets/banner-2.webp'
import banner3 from '../../assets/banner-3.webp'
import { Button } from "@/components/ui/button"
import { BabyIcon,  ChevronLeftIcon, ChevronRightIcon, CloudLightning,  Footprints,  Origami,  ShirtIcon, SwatchBook, TvIcon, UmbrellaIcon, WatchIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllFilteredProducts, getProductDetails} from "@/store/shop/product-slice"
import ShoppingProductTile from "./product-tile"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { addToCart, fetchFromCart,setProductId } from "@/store/shop/cart-slice"
import ProductDetailsDialog from "./product-details"

const categoriesWithIcon = [
    { id: "men", label: "Men", icon:ShirtIcon},
    { id: "women", label: "Women",icon:CloudLightning },
    { id: "kids", label: "Kids",icon:BabyIcon },
    { id: "accessories", label: "Accessories",icon:WatchIcon },
    { id: "footwear", label: "Footwear",icon:UmbrellaIcon },
]

const brandWithIcon = [
    { id: "nike", label: "Nike",icon:Footprints },
    { id: "adidas", label: "Adidas",icon:TvIcon},
    { id: "puma", label: "Puma",icon:Origami },
    { id: "levi", label: "Levi's",icon: SwatchBook },
    { id: "zara", label: "Zara",icon:ShirtIcon },
    { id: "h&m", label: "H&M",icon:ShirtIcon }
]
function ShoppingHome(){
    const [currentSlide,setCurrentSlice] = useState(0)
    const dispatch = useDispatch()
    const {productList,productDetails} = useSelector(state=>state.shopProduct)
    const {user} = useSelector(state=>state.auth)
    
    const slides = [banner1,banner2,banner3]
    const navigate = useNavigate()
    function handleAddToCart(getCurrentProductId){
        // console.log("getCurrentProductId ",getCurrentProductId);
        dispatch(setProductId(getCurrentProductId))
        dispatch(addToCart({userId:user.id,productId:getCurrentProductId,quantity:1})).then((data)=> {
            if(data?.payload?.success){
                console.log("user ",user);
                dispatch(fetchFromCart(user?.id))
                toast('Added to Cart ',{style:{color:'green',background:'white'}})
            }
        }
        )
        
    }

    function handleProductDetails(getCurrentProductId){
        dispatch(getProductDetails(getCurrentProductId))
    }

    function handleNavigateToListingPage(getCurrentItem,section){
        sessionStorage.removeItem('filters');
        const currentFilter = {
            [section]:[getCurrentItem.id]
        }

        sessionStorage.setItem('filters',JSON.stringify(currentFilter))
        navigate('/shop/listing')
    }
    useEffect(()=>{
        const timer = setInterval(()=>{
            setCurrentSlice(prevSlide => (prevSlide+1)%slides.length)
        },5000)

        return ()=>clearInterval(timer)
    })

    const [openDetailsDialog,setOpenDetailsDialog] = useState(false)

    useEffect(()=>{
        if(productDetails!==null) setOpenDetailsDialog(true)
    },[productDetails])

    useEffect(()=>{
        dispatch(fetchAllFilteredProducts({filterParams:{},sortParams:'price-lowtohigh'}))
    },[dispatch])
    // console.log("productList ",productList)

    return(
        <div className="flex flex-col min-h-screen">
            <div className="relative w-full h-[600px] overflow-hidden">
                {
                    slides.map((slide,index)=>
                        <img src={slide} key={index} className={` ${index === currentSlide ?'opacity-100':'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`} />
                    )
                }
                <Button variant='outline' size='icon' className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80'                  onClick={()=>setCurrentSlice(prevSlide => (prevSlide - 1 + slides.length)%slides.length)}>
                    <ChevronLeftIcon className="h-4 w-4"/>
                </Button>
                <Button variant='outline'
                 size='icon' 
                 className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80'
                 onClick={()=>setCurrentSlice(prevSlide => (prevSlide + 1)%slides.length)}
                >
                    <ChevronRightIcon className="h-4 w-4"/>
                </Button>
            </div>
            <section className="py-12 bg-gray-50 ">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Shop by category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {
                            categoriesWithIcon.map(item=>
                            <Card onClick={()=>handleNavigateToListingPage(item,'category')}  className='cursor-pointer hover:shadow-black transition-shadow border-0'>
                                <CardContent className='flex flex-col items-center justify-center p-6 '>
                                <item.icon className="w-12 mb-4 h-12 text-primary " />
                                <span className="font-bold">{item.label}</span>

                                </CardContent>
                            </Card>)
                        }
                    </div>
                </div>
            </section>
            <section className="py-12 bg-gray-50 ">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {
                            brandWithIcon.map(item=>
                            <Card onClick={()=>handleNavigateToListingPage(item,'brand')} className='cursor-pointer hover:shadow-black transition-shadow border-0'>
                                <CardContent className='flex flex-col items-center justify-center p-6 '>
                                <item.icon className="w-12 mb-4 h-12 text-primary " />
                                <span className="font-bold">{item.label}</span>

                                </CardContent>
                            </Card>)
                        }
                    </div>
                </div>
            </section>
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Feature Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {
                            productList && productList?.length ?
                                productList.map(productItem => <ShoppingProductTile handleAddToCart={handleAddToCart} 
                                 handleProductDetails={handleProductDetails}   
                                product={productItem}  />)
                            :null
                        }
                    </div>
            <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
                </div>
            </section>
        </div>
    )
}

export default ShoppingHome