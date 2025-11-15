import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetSearch, searchResult } from "@/store/shop/search-slice";
import ShoppingProductTile from "@/pages/shopping-view/product-tile";
import { toast } from "sonner";
import { addToCart, fetchFromCart, setProductId } from "@/store/shop/cart-slice";

function SearchPage(){
    const [keyword,setKeyword] = useState('') 
    const [searchParams,setSearchParams] = useSearchParams();
    const {searchResults} = useSelector(state=>state.shopSearch)
    const dispatch = useDispatch()
    const {cartItems} = useSelector(state=>state.shopCart)
    // console.log("searchParams",searchParams);
    const {user} = useSelector(state=>state.auth)
    useEffect(()=>{
        if(keyword && keyword.trim() !== '' && keyword.trim().length > 3 ){
            setTimeout(()=>{
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(searchResult(keyword))
            },1000)
         } else{
            dispatch(resetSearch())
         }   
    },[keyword])

    // console.log("search Results ",searchResults);
    function handleAddToCart(getCurrentProductId,getTotalStock){
        // console.log("getCurrentProductId ",getCurrentProductId);
        // console.log("get getTotalStock ", getTotalStock);
        
        // console.log("cart Items ",cartItems);
        let getCartItems = cartItems.items || [];
        if(getCartItems.length){
            const indexOfCurrentItems = getCartItems.findIndex(item=>item.productId === getCurrentProductId)
            if(indexOfCurrentItems > -1){
                const quantity = getCartItems[indexOfCurrentItems].quantity;
                if(quantity + 1 > getTotalStock){
                    toast(`only ${quantity} quantity can be added`,{
                        style:{
                            color:'white',
                            backgroundColor:'red',
                            border:'2px '
                        }
                    })
                    return;
                }

            }
        }

        
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

    return(
        <div className="container mx-auto md:px-6 px-4 py-8">
            <div className="flex justify-center mb-8">
                <div className="w-full flex items-center">
                    <Input value={keyword}
                    placeholder='Search Products'
                    className={'py-6'}
                    name='keyword'
                    onChange={(event)=>{
                        setKeyword(event.target.value)
                    }}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
                {
                    searchResults && searchResults.length ? 
                    searchResults.map(item=> <ShoppingProductTile handleAddToCart={handleAddToCart} product={item} />) :
                    <h1>No Results found</h1>
                }
            </div>
        </div>
    );
}

export default SearchPage;