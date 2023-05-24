import React, { memo, useEffect, useRef, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Icons, RankList } from '../../components'
import * as musicAction from '../../store/actions'

const { MdPlayCircle } = Icons

const activeStyle = {
    common: 'py-[13px] text-2xl font-bold text-[#dadada] uppercase border-b-[3px] border-transparent',
    active: 'py-[13px] text-2xl font-bold text-white uppercase border-b-[3px] border-[#9b4de0]',
}

const WeekChart = ({ weekChart }) => {
    const { pid } = useParams()
    const { listSong, curAlbumId } = useSelector((state) => state.music)
    const dispatch = useDispatch()
    const playBtnRef = useRef()

    useEffect(() => {
        dispatch(musicAction.setPlaylist(weekChart?.find((item) => item?.link?.includes(pid))?.items))
        dispatch(musicAction.setCurAlbumId(weekChart?.find((item) => item?.link?.includes(pid))?.playlistId))
    }, [pid, curAlbumId])

    const handleSetPlaylist = () => {
        if (listSong.length > 0) {
            dispatch(musicAction.setCurSongId(listSong[0].encodeId))
            dispatch(musicAction.setPlaying(true))
        }
    }

    return (
        <div className="w-full h-full pt-10 flex flex-col items-center text-white">
            <div className="w-full h-full mb-[30px] flex items-center gap-1 text-[40px] font-bold leading-normal text-white">
                <h3 title="24H" className="zingchart-text cursor-text">
                    Bảng Xếp Hạng Tuần
                </h3>
                <span ref={playBtnRef} onClick={handleSetPlaylist} className="cursor-pointer hover:opacity-90">
                    <MdPlayCircle size={46} className="text-white" />
                </span>
            </div>
            <div className="w-full min-h-[32px] mb-7 flex items-center gap-10">
                {weekChart?.map((item) => (
                    <NavLink
                        key={item?.country}
                        to={item?.link.split('.')[0]}
                        className={({ isActive }) => `${isActive ? activeStyle.active : activeStyle.common}`}
                    >
                        {item?.country === 'vn' ? 'Việt Nam' : item?.country === 'us' ? 'US-UK' : 'K-Pop'}
                    </NavLink>
                ))}
            </div>
            <div className="w-full h-[350px] overflow-auto">
                <RankList data={weekChart?.find((item) => item?.link?.includes(pid))?.items} limit={-1} />
            </div>
        </div>
    )
}

export default memo(WeekChart)
