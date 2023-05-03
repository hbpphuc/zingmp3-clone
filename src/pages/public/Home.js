import React, { useEffect } from 'react'
import { Header } from '../../layouts'
import { Slider } from '../../components'

const Home = () => {
    return (
        <div className="h-[1000px] overflow-y-auto">
            <div className="w-full px-[59px] mt-[70px]">
                <Slider />
            </div>
        </div>
    )
}

export default Home
