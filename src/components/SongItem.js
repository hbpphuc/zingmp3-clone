import React, { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { useDispatch } from 'react-redux'
import * as musicAction from '../store/actions'

const SongItem = ({ data }) => {
    const dispatch = useDispatch()

    return (
        <div
            onClick={() => {
                dispatch(musicAction.setCurSongId(data.encodeId))
                dispatch(musicAction.setPlaying(true))
            }}
            className="w-1/2 min-[1200px]:w-1/3 pr-[14px] "
        >
            <div className="w-full flex p-[10px] rounded hover:bg-[#ffffff1a]">
                <div className="w-[60px] h-[60px] mr-[10px] rounded cursor-pointer aspect-square">
                    <img src={data.thumbnail} alt={data.title} className="rounded object-cover aspect-square" />
                </div>
                <div className="flex flex-col justify-around cursor-default">
                    <div className="w-full text-sm font-medium leading-[1.33] line-clamp-1 text-ellipsis overflow-hidden">
                        {data.title}
                    </div>
                    <div className="w-full mt-[3px] text-xs font-normal text-[#ffffff80] leading-[1.33]">
                        {data.artistsNames}
                    </div>
                    <div className="w-full mt-[3px] text-xs font-normal text-[#ffffff80] leading-[1.33]">
                        {moment(data.releaseDate * 1000).fromNow() === 'một ngày trước'
                            ? 'Hôm qua'
                            : moment(data.releaseDate * 1000).fromNow()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(SongItem)
