import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Slider, HPlaylist, NewRelease, HWeekChart, HZingChart } from '../../components'

const Home = () => {
    const { hEditorTheme, hEditorTheme2, hArtistTheme, weekChart, h100, hAlbum } = useSelector((state) => state.app)

    return (
        <div className="h-[1000px] mt-[70px] px-[59px]">
            <Slider />
            <NewRelease />
            <HPlaylist data={hEditorTheme} />
            <HPlaylist data={hEditorTheme2} />
            <HPlaylist data={hArtistTheme} />1
            <HZingChart />
            <HWeekChart data={weekChart} />
            <HPlaylist data={h100} />
            <HPlaylist data={hAlbum} />
        </div>
    )
}

export default Home
