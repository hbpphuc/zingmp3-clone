import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import icons from '../assets/icons/Icons'
import { Button, SearchBar } from '../components'

const { VscArrowLeft, VscArrowRight } = icons

const Header = () => {
    const { singer } = useParams()
    const navigate = useNavigate()

    return (
        <div className={`w-full h-[70px] flex justify-between items-center gap-[10px] z-50`}>
            <div className="w-full h-[40px] flex grow">
                <div className="flex items-center gap-5">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-6 h-6 flex items-center disabled:opacity-30"
                        // disabled
                    >
                        <VscArrowLeft size={24} />
                    </button>
                    <button onClick={() => navigate(1)} className="w-6 h-6 flex items-center mr-5 ">
                        <VscArrowRight size={24} />
                    </button>
                </div>
                <div className="w-full max-w-[440px] flex justify-center items-center rounded-full">
                    <SearchBar />
                </div>
            </div>
            <div className="w-[140px] h-[40px] flex justify-center items-center">
                <Button
                    text={'Đăng nhập'}
                    style={'w-full h-full p-0 text-[#feffff] text-sm font-semibold bg-[#9b4de0]'}
                />
            </div>
        </div>
    )
}

export default Header
