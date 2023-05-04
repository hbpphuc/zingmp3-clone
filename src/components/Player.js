import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { toast } from 'react-toastify'
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
let intervalId

const Player = () => {
    const { curSongId, isPlaying, isVipSong } = useSelector((state) => state.music)
    const dispatch = useDispatch()
    const [songinfo, setSonginfo] = useState(null)
    const [audio, setAudio] = useState(new Audio())
    const [curSecond, setCurSecond] = useState(0)

    const thumbRef = useRef()
    const trackRef = useRef()

    useEffect(() => {
        const fetchInfoSong = async () => {
            const res1 = await musicApi.apiGetSong(curSongId)
            const res2 = await musicApi.apiGetInfoSong(curSongId)

            if (res1?.err === 0) {
                audio.pause()
                dispatch(musicAction.vipSong(false))
                setAudio(new Audio(res1.data['128']))
                audio.load()
                if (res2?.err === 0) {
                    setSonginfo(res2.data)
                }
            } else {
                toast.warning(res1.msg)
                dispatch(musicAction.vipSong(true))
            }
        }

        fetchInfoSong()
    }, [curSongId])

    useEffect(() => {
        if (isPlaying) {
            audio.play()
            intervalId = setInterval(() => {
                let percent = Math.round((audio?.currentTime * 10000) / songinfo.duration) / 100
                thumbRef.current.style.cssText = `right: ${100 - percent}%`
                setCurSecond(Math.round(audio?.currentTime))
            }, 200)
        }

        return () => {
            intervalId && clearInterval(intervalId)
        }
    }, [audio, isPlaying])

    const handlePlaySong = () => {
        if (isPlaying) {
            audio.pause()
            dispatch(musicAction.setPlaying(false))
        } else {
            audio.play()
            dispatch(musicAction.setPlaying(true))
        }
    }

    const handleChangeProgress = (e) => {
        const trackRect = trackRef.current.getBoundingClientRect()
        const percent = Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) / 100
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        audio.currentTime = (songinfo.duration * percent) / 100
        setCurSecond(Math.round((songinfo.duration * percent) / 100))
    }

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
                <div className="w-full h-[15px] mb-[5px] flex items-center justify-around">
                    <span className="text-xs font-medium opacity-50">
                        {moment.utc(curSecond * 1000).format('mm:ss')}
                    </span>
                    <div className="w-4/5 h-[15px] flex items-center relative">
                        <div
                            ref={trackRef}
                            onClick={handleChangeProgress}
                            className="w-full h-[3px] bg-[#ffffff4d] flex items-center rounded absolute left-0 hover:h-[6px]"
                        >
                            <div
                                ref={thumbRef}
                                className="thumb absolute top-0 bottom-0 left-0 bg-[#ffffff] rounded"
                            ></div>
                        </div>
                    </div>
                    <span className="text-xs font-medium">{moment.utc(songinfo?.duration * 1000).format('mm:ss')}</span>
                </div>
            </div>
            <div className="w-[30%] max-h-full flex-auto border border-red-400">player tool</div>
        </div>
    )
}

export default Player
