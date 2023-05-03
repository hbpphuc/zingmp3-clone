import React, { memo } from 'react'
import AlbumSongItem from './AlbumSongItem'

const AlbumSongList = ({ listSong }) => {
    return (
        <div className="w-full text-xs text-[#ffffff80] font-medium">
            <div className="w-full h-[46px] p-[10px] flex justify-between gap-[10px] items-center border-b border-[#ffffff0d]">
                <span className="flex-auto">BÀI HÁT</span>
                <span className="w-[35%] flex justify-start">ALBUM</span>
                <span className="w-[10%] flex justify-end ">THỜI GIAN</span>
            </div>
            <div>
                {listSong?.items.map((item) => (
                    <AlbumSongItem key={item.encodeId} songData={item} />
                ))}
            </div>
        </div>
    )
}

export default memo(AlbumSongList)
