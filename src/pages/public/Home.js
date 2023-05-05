import React, { useEffect } from 'react'
import { Slider, Playlist } from '../../components'

const Home = () => {
    return (
        <div className="h-[1000px] mt-[70px] px-[59px] overflow-y-auto">
            <Slider />
            <Playlist />
        </div>
    )
}

export default Home
