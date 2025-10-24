import React, { Fragment } from 'react'
import { ChartNetwork } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {ShoppingBag,  LayoutDashboard, ShoppingBasket } from 'lucide-react';
import { Sheet,SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

 const adminSidebarMenuItems = [
    {
        id:'dashboard',
        label:'Dashboard',
        path:'/admin/dashboard',
        icons:<LayoutDashboard />
    },
    {
        id:'products',
        label:'Products',
        path:'/admin/products',
        icons:<ShoppingBasket />
    },
    {
        id:'orders',
        label:'Orders',
        path:'/admin/orders',
        icons:<ShoppingBag />
    },
    
]
function MenuItems({setOpen}){
    const navigate = useNavigate()

  return <nav className='mt-8 flex-col flex gap-2'>
    {
      adminSidebarMenuItems.map((menuItem) => (<div onClick={()=>{
        navigate(menuItem.path);
        setOpen ? setOpen(false) : null
      }}className='flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer ' key={menuItem.id} >
        {menuItem.icons}
        <span>{menuItem.label}</span>
      </div>))
    }
  </nav>
}
const Sidebar = ({open,setOpen}) => {
      const navigate = useNavigate()

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side='left' className='w-64'>
            <div className='flex flex-col h-full bg-white'>
              <SheetHeader className='border-b'>
                <SheetTitle  className="flex gap-2 mt-5 mb-5">
                  <ChartNetwork />
                  <h1 className='text-xl font-extrabold '>Admin Panel</h1>   
                </SheetTitle>
              </SheetHeader>
              <MenuItems setOpen={setOpen}/>
            </div>
          </SheetContent>
      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-white p-6 lg:flex'>
        <div onClick={()=> navigate('/admin/dashboard')} className='flex items-center gap-2 cursor-pointer'>
          <ChartNetwork />
          <h1 className='text-xl font-extrabold '>Admin Panel</h1>

        </div>
        <MenuItems/>
      </aside>
    </Fragment>
  )
}

export default Sidebar;
