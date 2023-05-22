import React, { memo } from 'react'
import icons from './Icons'
import PlaylistItem from './PlaylistItem'

const { MdOutlineArrowForwardIos } = icons

const Playlist = ({ data }) => {
    return (
        <div className="w-full text-white mt-12">
            <div className="w-full mb-5 flex justify-between items-center">
                <h3 className="text-xl capitalize font-bold">{data?.title}</h3>
                {data?.items?.length > 5 && (
                    <span className="flex items-center text-xs text-[#ffffff80] uppercase font-medium cursor-pointer hover:purple-hover">
                        tất cả
                        <MdOutlineArrowForwardIos size={16} className="ml-[6px]" />
                    </span>
                )}
            </div>
            <div className="w-full flex gap-7">
                {data?.items?.length > 0 &&
                    data?.items?.slice(0, 5).map((item) => <PlaylistItem key={item.encodeId} data={item} />)}
            </div>
        </div>
    )
}

export default memo(Playlist)
