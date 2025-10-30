import { sortOptions } from "@/components/config"
import ProductFilter from "@/components/shopping-view/filter"
import { Button } from "@/components/ui/button"
import { DropdownMenuContent,DropdownMenu, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { fetchAllFilteredProducts } from "@/store/shop/product-slice"
import { ArrowUpDownIcon } from "lucide-react"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
function ShoppingListings(){
    const dispatch  = useDispatch()
    const {productList} = useSelector(state => state.shopProduct)
    useEffect(()=>{
        dispatch(fetchAllFilteredProducts())
    },[dispatch])

    console.log(productList);
    
    return(
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter/>
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="font-semibold">All Products</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-muted">10 Products</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='outline' size='sm' className='flex items-center gap-1'>
                                    <ArrowUpDownIcon className="h-4 w-4"/> Sort BY
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className='w-[200px] mt-4'>
                                <DropdownMenuRadioGroup className='bg-white '>
                                     {
                                        sortOptions.map(sortItem =>
                                            <DropdownMenuRadioItem className='hover:bg-gray-100' key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>
                                        )
                                     }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    
                </div>
            </div>
        </div>
    )
}

export default ShoppingListings