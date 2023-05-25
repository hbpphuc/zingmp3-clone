import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Button, Icons, SearchBar } from '../components'

const { VscArrowLeft, VscArrowRight } = Icons

const Header = () => {
    const { singer } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const [history, setHistory] = useState()
    const btnBackRef = useRef()

    useEffect(() => {
        setHistory(location.key)
    }, [location.key])

    // console.log({ history: location })
    return (
        <div className={`w-full h-[70px] flex justify-between items-center gap-[10px] z-50`}>
            <div className="w-full h-[40px] flex grow">
                <div className="flex items-center gap-5">
                    <button
                        ref={btnBackRef}
                        onClick={() => navigate(-1) || navigate('/')}
                        className="w-6 h-6 flex items-center disabled:opacity-30"
                    >
                        <VscArrowLeft size={24} />
                    </button>
                    <button onClick={() => navigate(1)} className="w-6 h-6 flex items-center mr-5">
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
