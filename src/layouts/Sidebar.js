import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import logo from '../assets/images/icon_zing_mp3_60.f6b51045.svg'
import { LogoDark } from '../components/Images'
import { sidebarMenu } from '../utils/menu'
import routes from '../utils/routes'

const activeStyle = {
    common: 'px-[21px] py-3 flex items-center gap-3 text-sm font-medium',
    active: 'bg-[#ffffff1a] text-[#ffffff] border-l-[3px] border-[#9b4de0]',
    notActive: ' text-[#dadada] border-l-[3px] border-transparent hover:text-[#ffffff]',
}

const Sidebar = () => {
    const { currentWidth } = useSelector((state) => state.app)
    const navigate = useNavigate()
    return (
        <div className="flex flex-col">
            <div className="w-full h-[70px] min-[1133px]:pl-7 min-[1133px]:pr-[25px] flex items-center justify-center min-[1133px]:justify-start">
                <div className="cursor-pointer hover:opacity-90" onClick={() => navigate(routes.HOME)}>
                    {currentWidth < 1133 ? (
                        <img src={logo} alt="logo" />
                    ) : (
                        <LogoDark className="w-[120px] h-[40px] object-cover" />
                    )}
                </div>
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
                        <span className="hidden min-[1133px]:flex">{item.text}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
