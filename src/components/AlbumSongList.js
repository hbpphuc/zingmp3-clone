import React, { memo } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import AlbumSongItem from './AlbumSongItem'
import icons from './Icons'

const { BsDot } = icons

const AlbumSongList = () => {
    const { listSong } = useSelector((state) => state.music)
    let totalSongDuration = listSong?.reduce((acc, curr) => acc + curr.duration, 0)

    return (
        <div className="w-full mb-[10px] text-xs text-[#ffffff80] font-medium">
            <div className="w-full h-[46px] p-[10px] flex justify-between gap-[10px] items-center border-b border-[#ffffff0d]">
                <span className="flex-auto">BÀI HÁT</span>
                <span className="w-[35%] flex justify-start">ALBUM</span>
                <span className="w-[10%] flex justify-end ">THỜI GIAN</span>
            </div>
            <div>
                {listSong?.map((item) => (
                    <AlbumSongItem key={item.encodeId} songData={item} />
                ))}
            </div>
            {listSong.length > 1 && (
                <div className="w-full mt-4 flex items-center text-[#ffffff80] text-[13px] leading-[18px]">
                    <span>{listSong?.length} bài hát</span>
                    <span>
                        <BsDot size={20} />
                    </span>
                    <span>
                        {totalSongDuration * 1000 > 3600000 &&
                            moment.utc(totalSongDuration * 1000).format('h') + ' giờ'}{' '}
                        {moment.utc(totalSongDuration * 1000).format('mm') + ` phút`}
                    </span>
                </div>
            )}
        </div>
    )
}

export default memo(AlbumSongList)
