import { House, LogOut, Menu, ShoppingCart,User} from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "../config";
import { DropdownMenu,DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";


function MenuItems(){
    return (
        <nav className="flex flex-col mt-10 lg:mb-0 gap-6 lg:flex-row">
            {
                shoppingViewHeaderMenuItems.map(mentItem => 
                    <Link key={mentItem.id} to={mentItem.path} className="text-sm font-medium">{mentItem.label}</Link>
                )
            }

        </nav>
    )
}

function HeaderRightContent(){
    const {user} = useSelector(state => state.auth)
    const  dispatch = useDispatch()
    const navigate = useNavigate()
    function handleLogout(){
        dispatch(logoutUser())
    }
    return(
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <Button variant='outline' size='icon'>
                 <ShoppingCart className="w-6 h-6" />
                <span className="sr-only" >User Cart</span>
            </Button>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="bg-black ">
                        <AvatarFallback className="bg-black text-white font-extrabold "> {user.userName[0].toUpperCase()}

                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-56 bg-white">
                    <DropdownMenuLabel>Logged in as {user.userName} </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>navigate('/shop/account')} className='hover:bg-gray-100'>
                        <User className="h-6 w-6" /> Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>handleLogout()} className='hover:bg-gray-100'>
                        <LogOut className="h-6 w-6" /> Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
        </div>
    )
}

function ShoppingHeader(){
    // const {isAuthenticated} = useSelector(state =>state.auth)
    return(
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to='/shop/home' className="flex items-center gap-2">
                    <House className="h-6 w-6" />
                    <span className="font-bold">Eccomerce</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant='outline' size='icon' className='lg:hidden'>
                            <Menu className="h-6 w-6" />
                            <span className="sr-only"></span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className='w-full max-w-s bg-white '>
                    <MenuItems />
                    <HeaderRightContent/>
                    </SheetContent>
                </Sheet>
                <div className="hidden lg:block">
                    <MenuItems />
                </div>
                 <div className="hidden lg:block">
                   <HeaderRightContent/>
                </div> 
                
            </div>

        </header>
    )
}

export default ShoppingHeader;