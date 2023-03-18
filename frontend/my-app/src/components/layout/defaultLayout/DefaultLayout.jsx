import React, { useContext, useState } from 'react'
import Header from './Header'
import { Sidebar } from './Sidebar'
import "./layout.css"
import SidebarContext from '../../../context/SidebarContext'

export const DefaultLayout = ({ children }) => {
  const { isOpenSideBar, onToggleSideBar } = useContext(SidebarContext);

  return (
    <>
      {/* height = 10 rows */}
      <div className="h-screen layout bg-[#ffefd690]" >
        {/* Header = 1 rows */}
        <div div className='w-full bg-[#3A8891] flex px-10 items-center justify-between row-span-1' >
          <Header />
        </div >

        {/* width = 12 columns */}
        < div className="grid grid-cols-12 gap-6 h-full" >
          {/* Side = 2 columns */}
          <div div className={`xl:bg-red-100 ${isOpenSideBar ? "col-span-2" : "md:hidden"} h-full min-w-[190px] md:flex hidden md:bg-blue-200`} >
            <Sidebar onCloseSidebar={onToggleSideBar} />
          </div >

          {/* Content = 10 columns */}
          <div div className="col-span-12 md:col-span-10" >
            {children}
          </div >
        </div >
      </div >
    </>

  )
}
