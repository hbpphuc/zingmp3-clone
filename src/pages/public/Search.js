import React, { useEffect, useRef } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { searchMenu } from '../../utils/menu'

const activeStyle = {
    common: 'flex items-center text-sm text-[#dadada] uppercase hover:text-white cursor-pointer relative',
    active: 'search-filter text-white',
    notActive: '',
}

const Search = () => {
    const { keyword } = useSelector((state) => state.music)

    return (
        <div className="w-full h-full">
            <div className="w-full min-h-[32px] mb-7 flex py-2 border-b border-[#ffffff1a]">
                <h3 className="w-max pr-5 text-2xl font-bold capitalize border-r border-[#ffffff1a]">
                    Kết Quả Tìm Kiếm
                </h3>
                <div className="mx-5 flex items-center gap-10 uppercase">
                    {searchMenu.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path + `?q=${keyword.replace(' ', '+')}`}
                            className={({ isActive }) =>
                                `${activeStyle.common} ${isActive ? activeStyle.active : activeStyle.notActive}`
                            }
                        >
                            {item.text}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Search
