import React, { memo, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useDebounce } from 'use-debounce'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import moment from 'moment'
import * as musicApi from '../apis/musicApi'
import * as musicAction from '../store/actions'
import icons from './Icons'
import { RotatingLines } from 'react-loader-spinner'

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
    MdMusicVideo,
    TbPictureInPicture,
    SlVolumeOff,
    SlVolume2,
    TbMicrophone2,
    MdOutlineQueueMusic,
} = icons

let intervalId

const Player = () => {
    const { curSongId, isPlaying, listSong, curAlbumId } = useSelector((state) => state.music)
    const { isPLayingBar, currentWidth } = useSelector((state) => state.app)

    const dispatch = useDispatch()
    const [songinfo, setSonginfo] = useState(null)
    const [audio, setAudio] = useState(new Audio())
    const [curSecond, setCurSecond] = useState(0)
    const [shuffle, setShuffle] = useState(false)
    const [repeat, setRepeat] = useState(0)
    const [loading, setLoading] = useState(false)
    const [volume, setVolume] = useState(1)
    const [isDisplay, setIsDisPlay] = useState(isPLayingBar)

    const [debounceSongId] = useDebounce(curSongId, 500)

    const thumbRef = useRef()
    const trackRef = useRef()
    const volumeTrackRef = useRef()
    const volumeThumbRef = useRef()
    const listPlayingBtnRef = useRef()

    useEffect(() => {
        const fetchInfoSong = async () => {
            setLoading(true)
            const res1 = await musicApi.apiGetSong(curSongId)
            const res2 = await musicApi.apiGetInfoSong(curSongId)
            setLoading(false)
            if (res1?.err === 0) {
                audio.pause()
                dispatch(musicAction.vipSong(false))
                setAudio(new Audio(res1.data['128']))
                audio.load()
                if (res2?.err === 0) {
                    setSonginfo(res2.data)
                    dispatch(musicAction.setCurSongData(res2.data))
                }
            } else {
                toast.warning(res1.msg)
                dispatch(musicAction.vipSong(true))
            }
        }

        fetchInfoSong()
    }, [debounceSongId])

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

    useEffect(() => {
        const handleEnded = () => {
            audio.pause()
            if (shuffle) {
                handleShuffleSong()
            } else if (repeat) {
                repeat === 1 ? handleRepeatOne() : handleNextSong()
            } else {
                audio.pause()
            }
        }

        audio.addEventListener('ended', handleEnded)

        return () => {
            audio.removeEventListener('ended', handleEnded)
        }
    }, [audio, shuffle, repeat])

    useEffect(() => {
        const volumeTrack = volumeTrackRef.current
        const handleChangeVolume = (e) => {
            const trackRect = volumeTrackRef.current.getBoundingClientRect()
            const percent = Math.floor(((e.clientX - trackRect.left) * 100) / trackRect.width)
            setVolume(percent / 100)

            volumeThumbRef.current.style.cssText = `right: ${100 - percent}%`
        }

        volumeTrack?.addEventListener('click', handleChangeVolume)
        audio.volume = volume

        return () => {
            volumeTrack?.removeEventListener('click', handleChangeVolume)
        }
    }, [volume])

    useEffect(() => {
        const playlistBtn = listPlayingBtnRef.current
        const handleToggleDisplay = () => {
            setIsDisPlay((prev) => !prev)
            dispatch(musicAction.togglePlayingBar(!isDisplay))
        }

        playlistBtn.addEventListener('click', handleToggleDisplay)

        return () => {
            playlistBtn.removeEventListener('click', handleToggleDisplay)
        }
    }, [isDisplay])

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

    const handleNextSong = (e) => {
        audio.play()
        if (listSong) {
            let curSongIndex
            listSong?.forEach((item, index) => {
                if (item.encodeId === curSongId) {
                    curSongIndex = index
                }
            })
            dispatch(musicAction.setCurSongId(listSong[curSongIndex + 1].encodeId))
            dispatch(musicAction.setPlaying(true))
        } else {
            e.preventDefault()
        }
    }

    const handlePrevSong = (e) => {
        if (listSong) {
            let curSongIndex
            listSong?.forEach((item, index) => {
                if (item.encodeId === curSongId) {
                    curSongIndex = index
                }
            })
            dispatch(musicAction.setCurSongId(listSong[curSongIndex - 1].encodeId))
            dispatch(musicAction.setPlaying(true))
        } else {
            e.preventDefault()
            alert('aaa')
        }
    }

    const handleShuffleSong = () => {
        const randomIndex = Math.round(Math.random() * listSong.length) - 1
        dispatch(musicAction.setCurSongId(listSong[randomIndex].encodeId))
        dispatch(musicAction.setPlaying(true))
        audio.play()
    }

    const handleRepeatOne = () => {
        audio.play()
    }

    return (
        <div className="min-w-[768px] h-[90px] flex justify-between items-center cursor-pointer">
            <div className="w-[30%] max-h-full flex-auto flex justify-start items-center">
                <div className="flex ">
                    <div className="w-16 h-16 mr-[10px] rounded bg-slate-300">
                        <img
                            src={songinfo?.thumbnail}
                            alt={songinfo?.title}
                            className="w-16 h-16 rounded object-cover"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="w-full text-sm font-medium text-white whitespace-nowrap text-ellipsis overflow-hidden">
                            {songinfo?.title}
                        </p>
                        <div className="max-w-full mt-[1px] flex justify-start items-center whitespace-nowrap text-ellipsis overflow-hidden text-xs text-[#ffffff80]">
                            <span className="hover:text-purple-hover">{songinfo?.artistsNames}</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center ml-[10px]">
                    {currentWidth > 900 && (
                        <div className="w-9 h-8 flex justify-center items-center">
                            <Tippy content="Thêm vào thư viện" className="text-xs">
                                <button className="w-[32px] h-[32px] flex justify-center items-center">
                                    <RiHeartLine className="w-full h-full p-[7px] hover:button-player" />
                                </button>
                            </Tippy>
                        </div>
                    )}
                    {currentWidth > 1028 && (
                        <div className="w-9 h-8 flex justify-center items-center">
                            <Tippy content="Xem thêm" className="text-xs">
                                <button className="w-[32px] h-[32px] flex justify-center items-center">
                                    <RiMoreFill className="w-full h-full p-[7px] hover:button-player" />
                                </button>
                            </Tippy>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-[40%] max-h-full flex-auto flex flex-col justify-center items-center gap-2">
                <div className="">
                    <div className="h-[50px] flex justify-center items-center gap-4">
                        <Tippy content="Bật phát ngẫu nhiên" className="text-xs">
                            <button className="w-[32px] h-[32px] flex justify-center items-center">
                                <TbArrowsShuffle
                                    onClick={() => setShuffle((prev) => !prev)}
                                    className={`w-full h-full p-[7px] hover:button-player ${shuffle && 'purple-hover'}`}
                                />
                            </button>
                        </Tippy>
                        <button onClick={handlePrevSong} className="w-[32px] h-[32px] flex justify-center items-center">
                            <TbPlayerSkipBackFilled className="w-full h-full p-[7px] hover:button-player" />
                        </button>
                        <div
                            onClick={handlePlaySong}
                            className="w-[40px] h-[40px] p-[5px] flex justify-center items-center rounded-full border-2 border-white hover:play-pause-hover"
                        >
                            <button className="w-full h-full flex justify-center items-center">
                                {loading ? (
                                    <RotatingLines
                                        strokeColor="#fff"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="40"
                                        visible={true}
                                        className="p-[3px]"
                                    />
                                ) : isPlaying ? (
                                    <TbPlayerPauseFilled className="w-full h-full p-[3px]" />
                                ) : (
                                    <TbPlayerPlayFilled className="w-full h-full p-[3px]" />
                                )}
                            </button>
                        </div>
                        <button
                            onClick={handleNextSong}
                            className="w-[32px] h-[32px] flex justify-center items-center disabled:cursor-not-allowed select-none"
                        >
                            <TbPlayerSkipForwardFilled className="w-full h-full p-[7px] hover:button-player" />
                        </button>
                        <Tippy content="Bật phát lại tất cả" className="text-xs">
                            <button
                                onClick={() => {
                                    setRepeat((prev) => (prev === 2 ? 0 : prev + 1))
                                }}
                                className="w-[32px] h-[32px] flex justify-center items-center"
                            >
                                {repeat === 1 ? (
                                    <TbRepeatOnce
                                        className={`w-full h-full p-[7px] hover:button-player ${
                                            repeat && 'purple-hover'
                                        }`}
                                    />
                                ) : (
                                    <TbRepeat
                                        className={`w-full h-full p-[7px] hover:button-player ${
                                            repeat && 'purple-hover'
                                        }`}
                                    />
                                )}
                            </button>
                        </Tippy>
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
            <div className="w-[30%] max-h-full flex-auto flex justify-end items-center">
                <Tippy content="MV" className="text-xs">
                    <button className="w-[40px] h-[36px] flex justify-center items-center">
                        <MdMusicVideo className="w-full h-full p-[7px] hover:button-player" />
                    </button>
                </Tippy>
                <Tippy content="Xem lời bài hát" className="text-xs">
                    <button className="w-[36px] h-[32px] flex justify-center items-center">
                        <TbMicrophone2 className="w-full h-full p-[8px] hover:button-player" />
                    </button>
                </Tippy>
                <Tippy content="Chế độ cửa sổ" className="text-xs">
                    <button className="w-[36px] h-[32px] flex justify-center items-center">
                        <TbPictureInPicture className="w-full h-full p-[8px] hover:button-player" />
                    </button>
                </Tippy>
                <div className="flex justify-center items-center mr-5">
                    <button
                        className="w-[36px] h-[32px] flex justify-center items-center"
                        onClick={() => (volume === 1 ? setVolume(0) : setVolume(1))}
                    >
                        {volume > 0 ? (
                            <SlVolume2 className="w-full h-full p-[8px] hover:button-player" />
                        ) : (
                            <SlVolumeOff className="w-full h-full p-[8px] hover:button-player" />
                        )}
                    </button>
                    {currentWidth > 1000 && (
                        <div className="w-[70px] h-[15px] flex items-center relative">
                            <div
                                ref={volumeTrackRef}
                                className="w-[70px] h-[3px] bg-[#ffffff4d] flex items-center rounded absolute left-0 hover:h-[6px]"
                            >
                                <div
                                    ref={volumeThumbRef}
                                    className={`thumb absolute top-0 bottom-0 left-0 
                                ${volume === 1 && 'right-0'} bg-[#ffffff] rounded`}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>
                <Tippy content="Danh sách phát" className="text-xs ml-5">
                    <button
                        ref={listPlayingBtnRef}
                        className={`w-[30px] h-[30px] flex justify-center items-center rounded ${
                            isDisplay
                                ? 'bg-[#9b4de0] text-white hover:brightness-90'
                                : 'bg-[#ffffff1a] hover:bg-[#ffffff33]'
                        }`}
                    >
                        <MdOutlineQueueMusic className="w-full h-full p-[5px] " />
                    </button>
                </Tippy>
            </div>
        </div>
    )
}

export default memo(Player)
