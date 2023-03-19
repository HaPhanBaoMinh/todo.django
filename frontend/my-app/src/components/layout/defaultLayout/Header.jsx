import React from 'react'
import logo from '../../../utils/default-avatar.jpeg'

function Header() {
    return (
        <>
            {/* Logo */}
            <div className='flex justify-center gap-2 text-[#FFEFD6] items-center'>
                <h3 className="font-bold text-xl">DOIT</h3>
            </div>

            {/* Search bar */}
            <div className="xl:w-[30%]">
                <form>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only ">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-4 h-4 text-gray-500" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-[6px] pl-10 text-sm border rounded outline-none " placeholder="Search Task" required />
                    </div>
                </form>
            </div>

            {/* Account */}
            <div>
                <img className="w-8 h-8 border-2 border-white rounded-full" src={logo} alt="" />
            </div>
        </>
    )
}

export default Header