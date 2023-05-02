import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../layouts'

const Public = () => {
    return (
        <div className="w-full h-full flex overflow-y-auto relative">
            <div className="w-[240px] h-full bg-[#ffffff0d] fixed">
                <Sidebar />
            </div>
            <div className="w-[calc(100%_-_240px)] absolute right-0">
                <Outlet />
            </div>
        </div>
    )
}

export default Public
