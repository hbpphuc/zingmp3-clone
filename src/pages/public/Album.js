import React, { memo, useEffect, useRef, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import moment from 'moment/moment'
import { useDispatch, useSelector } from 'react-redux'
import { Audio } from 'react-loader-spinner'
import * as musicApi from '../../apis/musicApi'
import * as musicAction from '../../store/actions'
import { AlbumSongList, Icons, Loading } from '../../components'

const { TbPlayerPlayFilled } = Icons

const Album = () => {
    const { pid } = useParams()
    const location = useLocation()
    const { isPlaying, curSongId, curSongData } = useSelector((state) => state.music)
    const { isLoading, currentWidth } = useSelector((state) => state.app)
    const dispatch = useDispatch()
    const [playlistData, setPlaylistData] = useState({})
    const overlayRef = useRef()
    const ref = useRef()

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            dispatch(musicAction.loading(true))
            const res = await musicApi.apiGetDetailPlaylist(pid)
            dispatch(musicAction.loading(false))
            if (res?.err === 0) {
                setPlaylistData(res?.data)
                dispatch(musicAction.setCurAlbumId(res?.data?.encodeId))
                dispatch(musicAction.setPlaylist(res?.data?.song?.items))
            }
        }

        fetchDetailPlaylist()
    }, [pid])

    console.log(playlistData)

    useEffect(() => {
        if (location.state?.playAlbum) {
            dispatch(musicAction.setCurSongId(playlistData?.song?.items[0]?.encodeId))
            dispatch(musicAction.setCurAlbumId(location.state?.albumId))
            dispatch(musicAction.setPlaying(true))
            dispatch(musicAction.setRecentSongs({ data: curSongData }))
        }
    }, [pid, playlistData])

    const handleClickPlay = () => {
        dispatch(musicAction.setCurSongId(playlistData?.song?.items[0]?.encodeId))
        dispatch(musicAction.setCurAlbumId(location.state?.albumId))
        dispatch(musicAction.setPlaying(true))
        dispatch(musicAction.setRecentSongs({ data: curSongData }))
    }

    useEffect(() => {
        ref.current.scrollIntoView()
    }, [])

    return (
        <div ref={ref} className="w-full flex flex-col text-white relative">
            {isLoading && (
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#170f23] z-10">
                    <div className="w-creen h-screen flex justify-center items-center ">
                        <Loading />
                    </div>
                </div>
            )}
            <div className="w-full my-[30px] flex flex-col xl:flex-row justify-start items-start gap-7 relative">
                <div className="flex-1 h-[540px] xl:pb-[30px] pb-0 flex xl:flex-col xl:sticky top-[110px]">
                    <div className="w-[200px] xl:w-full h-auto mr-5 min-[1260px]:mr-0 rounded-lg shadow-[0_5px_8px_0_rgba(0,0,0,0.2)] overflow-hidden relative">
                        <img
                            src={playlistData.thumbnailM}
                            alt={playlistData.title}
                            className={`w-full h-full object-cover ${
                                isPlaying
                                    ? 'rounded-full animate-rotate-center'
                                    : 'animation-rotate-center-pause rounded-lg'
                            } `}
                        />
                        <div
                            ref={overlayRef}
                            className={`w-full h-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 hover:bg-[#0000004a] cursor-pointer ${
                                isPlaying && 'rounded-full'
                            }`}
                        >
                            {isPlaying ? (
                                <div className="w-[50px] h-[50px] flex justify-center items-center border border-white rounded-full">
                                    <Audio
                                        height="30"
                                        width="30"
                                        radius="9"
                                        color="white"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle
                                        wrapperClass
                                    />
                                </div>
                            ) : (
                                <div className="w-[50px] h-[50px] p-[5px] flex justify-center items-center rounded-full border-2 border-white hover:opacity-90">
                                    <button
                                        onClick={handleClickPlay}
                                        className="w-full h-full flex justify-center items-center"
                                    >
                                        <TbPlayerPlayFilled className="w-full h-full p-[3px]" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-1 mt-3 flex flex-col xl:items-center">
                        <div className="flex flex-col xl:items-start">
                            <h3 className="w-full xl:text-center text-xl font-bold">{playlistData?.title}</h3>
                            <div className="w-full flex flex-col xl:items-center justify-center">
                                <p className="text-xs text-[#ffffff80] leading-[1.75]">
                                    Cập nhật: {moment.unix(playlistData?.contentLastUpdate).format('DD/MM/YYYY')}
                                </p>
                                <p className="flex xl:justify-center items-center flex-wrap text-xs text-[#ffffff80] leading-[1.75] text-center hover:singer-hover">
                                    {playlistData?.artists?.map((item) => (
                                        <Link
                                            to={item.link}
                                            key={item.encodeId}
                                            className="mr-1 cursor-pointer hover:text-purple-hover"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </p>
                                <p className="text-xs text-[#ffffff80] leading-[1.75]">
                                    {Math.floor(playlistData?.like / 1000)}K người yêu thích
                                </p>
                            </div>
                            {playlistData.sortDescription && currentWidth < 1280 && (
                                <div className="mb-[10px] mt-4">
                                    <span className="text-sm text-[#ffffff80]">Lời tựa </span>
                                    <span className="text-sm text-white text-ellipsis line-clamp-2 overflow-hidden">
                                        {playlistData.sortDescription}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full xl:w-[70%]">
                    {playlistData.sortDescription && currentWidth >= 1280 && (
                        <div className="mb-[10px]">
                            <span className="text-sm text-[#ffffff80]">Lời tựa </span>
                            <span className="text-sm text-white text-ellipsis line-clamp-3 overflow-hidden">
                                {playlistData.sortDescription}
                            </span>
                        </div>
                    )}
                    <AlbumSongList />
                </div>
            </div>
            {/* <div>ARTIST CHANNEL</div>
            <div>ARTIST PLAYLIST</div> */}
        </div>
    )
}

export default memo(Album)
