import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as musicApi from '../apis/musicApi'
import * as musicAction from '../store/actions'
import icons from '../assets/icons/Icons'

const {
    RiHeartLine,
    RiHeartFill,
    RiMoreFill,
    TbArrowsShuffle,
    TbRepeatOnce,
    TbRepeat,
    TbPlayerPauseFilled,
    TbPlayerPlayFilled,
    TbPlayerSkipBackFilled,
    TbPlayerSkipForwardFilled,
    TbPictureInPicture,
    SlVolumeOff,
    SlVolume2,
    GiMicrophone,
} = icons

const Player = () => {
    const { curSongId, isPlaying } = useSelector((state) => state.music)
    const dispatch = useDispatch()
    const [source, setSource] = useState(null)
    const [songinfo, setSonginfo] = useState(null)
    const audioEl = useRef(new Audio())

    useEffect(() => {
        const fetchInfoSong = async () => {
            const res1 = await musicApi.apiGetSong(curSongId)
            const res2 = await musicApi.apiGetInfoSong(curSongId)

            if (res1?.err === 0) {
                setSource(res1.data['128'])
            }
            if (res2?.err === 0) {
                setSonginfo(res2.data)
            }
        }

        fetchInfoSong()
    }, [curSongId])

    useEffect(() => {
        audioEl.current.pause()
        audioEl.current.src = source
        audioEl.current.load()
        if (isPlaying) audioEl.current.play()
        if (audioEl.current.ended) dispatch(musicAction.setPlaying(false))
    }, [curSongId, source])

    console.log(isPlaying)

    const handlePlaySong = () => {
        if (isPlaying) {
            audioEl.current.pause()
            dispatch(musicAction.setPlaying(false))
        } else {
            audioEl.current.play()
            dispatch(musicAction.setPlaying(true))
        }
    }

    useEffect(() => {}, [curSongId])

    return (
        <div className="min-w-[768px] h-[90px] flex justify-between items-center cursor-pointer">
            <div className="w-[30%] max-h-full flex-auto flex justify-start items-center ">
                <div className="w-16 h-16 mr-[10px] rounded bg-slate-300">
                    <img src={songinfo?.thumbnail} alt={songinfo?.title} className="w-16 h-16 rounded object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                    <p className="w-full text-sm font-medium text-white whitespace-nowrap text-ellipsis overflow-hidden">
                        {songinfo?.title}
                    </p>
                    <div className="max-w-full mt-[1px] flex justify-start items-center whitespace-nowrap text-ellipsis overflow-hidden text-xs text-[#ffffff80]">
                        {/* <span className="hover:purple-hover">Singer 1</span>
                        <span>,&nbsp;</span>
                        <span className="hover:purple-hover">Singer 2</span> */}
                        <span className="hover:purple-hover">{songinfo?.artistsNames}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center ml-[10px]">
                    <div className="w-9 h-8 flex justify-center items-center">
                        <button className="w-[32px] h-[32px] flex justify-center items-center">
                            <RiHeartLine className="w-full h-full p-[7px] hover:button-player" />
                        </button>
                    </div>
                    <div className="w-9 h-8 flex justify-center items-center">
                        <button className="w-[32px] h-[32px] flex justify-center items-center">
                            <RiMoreFill className="w-full h-full p-[7px] hover:button-player" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-[40%] max-h-full flex-auto flex flex-col justify-center items-center gap-2">
                <div className="">
                    <div className="h-[50px] flex justify-center items-center gap-4">
                        <button className="w-[32px] h-[32px] flex justify-center items-center">
                            <TbArrowsShuffle className="w-full h-full p-[7px] hover:button-player" />
                        </button>
                        <button className="w-[32px] h-[32px] flex justify-center items-center">
                            <TbPlayerSkipBackFilled className="w-full h-full p-[7px] hover:button-player" />
                        </button>
                        <div
                            onClick={handlePlaySong}
                            className="w-[40px] h-[40px] p-[5px] flex justify-center items-center rounded-full border-2 border-white hover:play-pause-hover"
                        >
                            <button className="w-full h-full flex justify-center items-center">
                                {isPlaying ? (
                                    <TbPlayerPauseFilled className="w-full h-full p-[3px]" />
                                ) : (
                                    <TbPlayerPlayFilled className="w-full h-full p-[3px]" />
                                )}
                            </button>
                        </div>
                        <button className="w-[32px] h-[32px] flex justify-center items-center">
                            <TbPlayerSkipForwardFilled className="w-full h-full p-[7px] hover:button-player" />
                        </button>
                        <button className="w-[32px] h-[32px] flex justify-center items-center">
                            <TbRepeat className="w-full h-full p-[7px] hover:button-player" />
                        </button>
                    </div>
                </div>
                <div className="h-1/2">progress bar</div>
            </div>
            <div className="w-[30%] max-h-full flex-auto border border-red-400">player tool</div>
        </div>
    )
}

export default Player
