import React, { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { useDispatch, useSelector } from 'react-redux'
import * as musicAction from '../store/actions'

const SongItem = ({ data, releaseDate, order, percent, sm, isActive }) => {
    const { curSongId } = useSelector((state) => state.music)
    const dispatch = useDispatch()

    return (
        <div
            onDoubleClick={() => {
                dispatch(musicAction.setCurSongId(data?.encodeId))
                dispatch(musicAction.setPlaying(true))
                dispatch(musicAction.setRecentSongs({ data }))
            }}
            className={`w-full flex justify-between items-center ${sm ? 'p-[8px]' : 'p-[10px]'} rounded ${
                isActive ? 'bg-[#9b4de0]' : 'bg-transparent hover:bg-[#ffffff1a]'
            } relative`}
        >
            <div className="flex items-center">
                {order && (
                    <div
                        className={`zingchart-order mr-[15px] ml-[5px] ${
                            order === 1 ? 'zc-order-1' : order === 2 ? 'zc-order-2' : order === 3 ? 'zc-order-3' : ''
                        }`}
                    >
                        {order}
                    </div>
                )}
                <div
                    onClick={() => {
                        dispatch(musicAction.setCurSongId(data?.encodeId))
                        dispatch(musicAction.setPlaying(true))
                        dispatch(musicAction.setRecentSongs({ data }))
                    }}
                    className={`${
                        sm ? 'w-[40px] h-[40px]' : 'w-[60px] h-[60px]'
                    } mr-[10px] rounded cursor-pointer aspect-square`}
                >
                    <img src={data.thumbnail} alt={data.title} className="rounded object-cover aspect-square" />
                </div>
                <div className="flex flex-col justify-around cursor-default">
                    <div className="w-full text-sm font-medium leading-[1.33] line-clamp-1 text-ellipsis overflow-hidden">
                        {data.title}
                    </div>
                    <div
                        className={`w-full mt-[3px] text-xs font-normal ${
                            sm ? 'text-[#ffffff99]' : 'text-[#ffffff80]'
                        } leading-[1.33]`}
                    >
                        {data.artistsNames}
                    </div>
                    {releaseDate && (
                        <div className="w-full mt-[3px] text-xs font-normal text-[#ffffff80] leading-[1.33]">
                            {moment(releaseDate * 1000).fromNow() === 'một ngày trước'
                                ? 'Hôm qua'
                                : moment(releaseDate * 1000).fromNow()}
                        </div>
                    )}
                </div>
            </div>
            {percent && <div className="mr-[5px] text-base font-bold cursor-default">{percent}</div>}
        </div>
    )
}

export default memo(SongItem)
