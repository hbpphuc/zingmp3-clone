import React from 'react'
import { NavLink } from 'react-router-dom'
import { LogoDark, LogoLight } from '../assets/images/Images'
import { sidebarMenu } from '../utils/menu'

const activeStyle = {
    common: 'px-[21px] py-3 flex items-center gap-3 text-sm font-medium',
    active: 'bg-[#ffffff1a] text-[#ffffff] border-l-[3px] border-[#9b4de0]',
    notActive: ' text-[#dadada] border-l-[3px] border-transparent hover:text-[#ffffff]',
}

const Sidebar = () => {
    return (
        <div className="flex flex-col">
            <div className="w-full h-[70px] pl-7 pr-[25px] flex items-center ">
                <LogoDark className="w-[120px] h-[40px] object-cover" />
            </div>

            <div className="flex flex-col">
                {sidebarMenu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `${activeStyle.common} ${isActive ? activeStyle.active : activeStyle.notActive}`
                        }
                    >
                        <span className="fill-current border-transparent">{item.icon}</span>
                        <span>{item.text}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
