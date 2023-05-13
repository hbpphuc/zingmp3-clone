import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Slider, Playlist, NewRelease } from '../../components'

const Home = () => {
    const { hEditorTheme, hEditorTheme2, hArtistTheme, h100, hAlbum } = useSelector((state) => state.app)

    return (
        <div className="h-[1000px] mt-[70px] px-[59px]">
            <Slider />
            <NewRelease />
            <Playlist data={hEditorTheme} />
            <Playlist data={hEditorTheme2} />
            <Playlist data={hArtistTheme} />
            <Playlist data={h100} />
            <Playlist data={hAlbum} />
        </div>
    )
}

export default Home
