import React, { useEffect } from 'react'
import { Header } from '../../layouts'
import { Slider } from '../../components'

const Home = () => {
    return (
        <div className="h-[1000px] overflow-y-auto">
            <div className="min-w-[660px] h-[70px] px-[59px] flex items-center fixed left-[240px] top-0 right-0 text-white backdrop-blur-[50px] bg-[#170f23cc] shadow-[0_3px_5px_rgba(0,0,0,0.1)] z-10">
                <Header />
            </div>
            <div className="w-full px-[59px] mt-[70px]">
                <Slider />
            </div>
        </div>
    )
}

export default Home
