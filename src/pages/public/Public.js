import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../layouts'

const Public = () => {
    return (
        <div className="w-full flex overflow-y-auto">
            <div className="w-[240px] bg-[#ffffff0d]">
                <Sidebar />
            </div>
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    )
}

export default Public
