import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as homeApi from '../../apis/homeApi'
import * as homeAction from '../../store/actions'
import { Slider, Playlist, NewRelease, HWeekChart, HZingChart, Loading } from '../../components'

const Home = () => {
    const { isLoading, hEditorTheme, hEditorTheme2, hArtistTheme, weekChart, h100, hAlbum } = useSelector(
        (state) => state.app,
    )
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchHome = async () => {
            dispatch(homeAction.loading(true))
            await homeApi.getHome()
            dispatch(homeAction.loading(false))
        }
        fetchHome()
    }, [])

    return (
        <div className="w-full flex flex-col text-white relative">
            {isLoading && hEditorTheme && (
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#170f23] z-50 mx-[-50px]">
                    <div className="w-creen h-screen flex justify-center items-center ">
                        <Loading />
                    </div>
                </div>
            )}
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
