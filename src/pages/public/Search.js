import React from 'react'
import { Outlet } from 'react-router-dom'

const Search = () => {
    return (
        <div className="w-full relative">
            <div className="w-full mb-7 flex py-2 border-b border-[#ffffff1a]">
                <h3 className="w-max pr-5 text-2xl font-bold capitalize border-r border-[#ffffff1a]">
                    Kết Quả Tìm Kiếm
                </h3>
                <div className="mx-5 flex items-center gap-10">
                    <span className="text-sm text-[#dadada] uppercase hover:text-white cursor-pointer">tất cả</span>
                    <span className="text-sm text-[#dadada] uppercase hover:text-white cursor-pointer">bài hát</span>
                    <span className="text-sm text-[#dadada] uppercase hover:text-white cursor-pointer">
                        playlist/album
                    </span>
                    <span className="text-sm text-[#dadada] uppercase hover:text-white cursor-pointer">nghệ sĩ/oa</span>
                    <span className="text-sm text-[#dadada] uppercase hover:text-white cursor-pointer">mv</span>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Search
