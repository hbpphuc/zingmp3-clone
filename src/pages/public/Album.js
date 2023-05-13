import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment/moment'
import { useDispatch, useSelector } from 'react-redux'
import { Audio } from 'react-loader-spinner'
import * as musicApi from '../../apis/musicApi'
import * as musicAction from '../../store/actions'
import { AlbumSongList, Loading } from '../../components'
import icons from '../../assets/icons/Icons'

const { TbPlayerPlayFilled } = icons

const Album = () => {
    const { pid } = useParams()
    const { isPlaying } = useSelector((state) => state.music)
    const { isLoading } = useSelector((state) => state.app)
    const dispatch = useDispatch()
    const [playlistData, setPlaylistData] = useState({})
    const overlayRef = useRef()

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            dispatch(musicAction.loading(true))
            const res = await musicApi.apiGetDetailPlaylist(pid)
            dispatch(musicAction.loading(false))
            if (res?.err === 0) {
                setPlaylistData(res.data)
                dispatch(musicAction.setPlaylist(res?.data?.song.items))
            }
        }

        fetchDetailPlaylist()
    }, [pid])

    return (
        <div className="w-full px-[59px] pt-[10px] mt-[70px] flex flex-col text-white relative">
            {isLoading && (
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#170f23] z-10">
                    <div className="w-creen h-screen flex justify-center items-center ">
                        <Loading />
                    </div>
                </div>
            )}
            <div className="w-full my-[30px] flex gap-7 relative">
                <div className="flex-auto h-[540px] pb-[30px] sticky top-[110px]">
                    <div className="w-[300px] h-auto rounded-lg shadow-[0_5px_8px_0_rgba(0,0,0,0.2)] overflow-hidden relative">
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
                                    <button className="w-full h-full flex justify-center items-center">
                                        <TbPlayerPlayFilled className="w-full h-full p-[3px]" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full mt-3 flex flex-col items-center">
                        <div className="flex flex-col items-center">
                            <h3 className="text-xl font-bold">{playlistData.title}</h3>
                            <div className="flex flex-col items-center">
                                <p className="text-xs text-[#ffffff80] leading-[1.75]">
                                    Cập nhật: {moment.unix(playlistData.contentLastUpdate).format('DD/MM/YYYY')}
                                </p>
                                <p className="text-xs text-[#ffffff80] leading-[1.75] text-center hover:singer-hover">
                                    {playlistData.artistsNames}
                                </p>
                                <p className="text-xs text-[#ffffff80] leading-[1.75]">
                                    {Math.floor(playlistData.like / 1000)}K người yêu thích
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[calc(100%_-_140px)]">
                    <div className="mb-[10px]">
                        <span className="text-sm text-[#ffffff80]">Lời tựa </span>
                        <span className="text-sm text-white">{playlistData.sortDescription}</span>
                    </div>
                    <AlbumSongList />
                </div>
            </div>
            <div>ARTIST CHANNEL</div>
            <div>ARTIST PLAYLIST</div>
        </div>
    )
}

export default Album
