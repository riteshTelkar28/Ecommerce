import { sortOptions } from "@/components/config"
import ProductFilter from "@/components/shopping-view/filter"
import { Button } from "@/components/ui/button"
import { DropdownMenuContent,DropdownMenu, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { fetchAllFilteredProducts, getProductDetails} from "@/store/shop/product-slice"
import { ArrowUpDownIcon, Funnel } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ShoppingProductTile from "./product-tile"
import {  useSearchParams } from "react-router-dom"
import ProductDetailsDialog from "./product-details"
import { addToCart, fetchFromCart, setProductId } from "@/store/shop/cart-slice"
import { toast } from "sonner"

function createSearchParamsHelper(filterParams){
    const queryParams = [];
    
    for(const[key,value] of Object.entries(filterParams)){
        if(Array.isArray(value) && value.length>0){
            const paramValue = value.join(',');
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
        }
    }
    return queryParams.join('&')
}
function ShoppingListings(){
    const dispatch  = useDispatch()
    const [searchParams,setSearchParams] = useSearchParams()
    const {productList,productDetails} = useSelector(state => state.shopProduct)
    const {user} = useSelector(state=>state.auth)
    
    const[filters,setFilters] = useState(null)
    const [sort,setSort] = useState(null)
    const [openDetailsDialog,setOpenDetailsDialog] = useState(false)

    const categorySearchParams = searchParams.get('category')
    useEffect(()=>{
        if(productDetails!==null) setOpenDetailsDialog(true)
    },[productDetails])

    useEffect(()=>{
        if(filters !== null && sort !== null)
            dispatch(fetchAllFilteredProducts({filterParams:filters,sortParams:sort}))
    },[dispatch,sort,filters])

    useEffect(()=>{
        if(filters && Object.keys(filters).length > 0){
            const createQueryString = createSearchParamsHelper(filters);
            setSearchParams(new URLSearchParams(createQueryString))
        }
    },[filters])

    function handleProductDetails(getCurrentProductId){
        dispatch(getProductDetails(getCurrentProductId))
    }

    function handleAddToCart(getCurrentProductId){
        console.log("getCurrentProductId ",getCurrentProductId);
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

    function handleSort(value){
        console.log(value);
        setSort(value)
    }

    function handleFilter(getSectionId,getCurrentOption){
        console.log(getSectionId, getCurrentOption);
        let copyFilters = {...filters};
        const indexOfCurrentSection = Object.keys(copyFilters).indexOf(getSectionId)

        if(indexOfCurrentSection===-1){
            copyFilters={
                ...copyFilters,
                [getSectionId]:[getCurrentOption]
            }
        }else{
            const indexOfOption = copyFilters[getSectionId].indexOf(getCurrentOption)
            if(indexOfOption===-1) copyFilters[getSectionId].push(getCurrentOption)
                else copyFilters[getSectionId].splice(indexOfOption,1);

        }
        // console.log(copyFilters);
        setFilters(copyFilters)
        sessionStorage.setItem('filters',JSON.stringify(copyFilters)) 
        
    }
    // console.log(productList);
    useEffect(()=>{
        setSort('price-lowtohigh')
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
    },[categorySearchParams])
    
    return(
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter filters={filters} handleFilter={handleFilter}/>
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="font-semibold">All Products</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-muted">{productList.length} Products</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='outline' size='sm' className='flex items-center gap-1'>
                                    <ArrowUpDownIcon className="h-4 w-4"/> Sort BY
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className='w-[200px] mt-4'>
                                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort} className='bg-white '>
                                     {
                                        sortOptions.map(sortItem =>
                                            <DropdownMenuRadioItem className='hover:bg-gray-100' value={sortItem.id} key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>
                                        )
                                     }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 mt-0">
                    {
                        productList && productList.length >0 ?
                        productList.map((product)=>
                            <ShoppingProductTile handleAddToCart={handleAddToCart} handleProductDetails={handleProductDetails} product={product} />
                        ) : null
                    }
                </div>
            </div>
            <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
        </div>
    )
}

export default ShoppingListings