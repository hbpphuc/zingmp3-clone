import React from 'react'
import icons from '../assets/icons/Icons'
import { Search } from '../components'

const { VscArrowLeft, VscArrowRight } = icons

const Header = () => {
    return (
        <div className="w-full h-[40px] flex justify-between items-center gap-[10px]">
            <div className="w-full h-[40px] flex grow">
                <div className="flex items-center gap-5">
                    <button className="w-6 h-6 flex items-center disabled:opacity-30" disabled>
                        <VscArrowLeft size={24} />
                    </button>
                    <button className="w-6 h-6 flex items-center mr-5 ">
                        <VscArrowRight size={24} />
                    </button>
                </div>
                <div className="w-full max-w-[440px] flex justify-center items-center rounded-full">
                    <Search />
                </div>
            </div>
            <div>dang nhap</div>
        </div>
    )
}

export default Header
