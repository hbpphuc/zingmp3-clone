import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Slider, Playlist, NewRelease, HWeekChart, HZingChart } from '../../components'

const Home = () => {
    const { hEditorTheme, hEditorTheme2, hArtistTheme, weekChart, h100, hAlbum } = useSelector((state) => state.app)

    return (
        <div>
            <Slider />
            <NewRelease />
            <Playlist data={hEditorTheme} />
            <Playlist data={hEditorTheme2} />
            <Playlist data={hArtistTheme} />
            <HZingChart />
            <HWeekChart data={weekChart} />
            <Playlist data={h100} />
            <Playlist data={hAlbum} />
        </div>
    )
}

export default Home
