import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchResult } from "@/store/shop/search-slice";

function SearchPage(){
    const [keyword,setKeyword] = useState('') 
    const [searchParams,setSearchParams] = useSearchParams();
    const {searchResults} = useSelector(state=>state.shopSearch)
    const dispatch = useDispatch()

    // console.log("searchParams",searchParams);
    
    useEffect(()=>{
        if(keyword && keyword.trim() !== '' && keyword.trim().length > 3 ){
            setTimeout(()=>{
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(searchResult(keyword))
            },1000)
         }    
    },[keyword])

    console.log("search Results ",searchResults);
    
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
            <div>Search Results</div>
        </div>
    );
}

export default SearchPage;