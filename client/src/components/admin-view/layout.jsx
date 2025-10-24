import React, { useState } from "react"
import { Outlet } from "react-router-dom";
import AdminHeader from "./header";
import Sidebar from "./sidebar";
function AdminLayout(){
    const [openSidebar,setOpenSideBar] = useState(false)
    return(
        <>
            <div className="flex min-h-screen w-full">
                <Sidebar open={openSidebar} setOpen={setOpenSideBar}/>
                <div className="flex flex-1 flex-col">
                    <AdminHeader setOpen={setOpenSideBar}/>
                    <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
                        <Outlet/>
                    </main>

                </div>

            </div>
        </>
    )
}

export default AdminLayout;