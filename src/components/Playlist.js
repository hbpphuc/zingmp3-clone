import React, { memo } from 'react'
import icons from './Icons'
import PlaylistItem from './PlaylistItem'

const { MdOutlineArrowForwardIos } = icons

const Playlist = ({ data, top100, viewType }) => {
    return (
        <div className="w-full text-white mt-12">
            <div className="w-full mb-5 flex justify-between items-center">
                <h3 className="text-xl capitalize font-bold">{data?.title}</h3>
                {top100
                    ? ''
                    : data?.items?.length > 5 && (
                          <span className="flex items-center text-xs text-[#ffffff80] uppercase font-medium cursor-pointer hover:purple-hover">
                              tất cả
                              <MdOutlineArrowForwardIos size={16} className="ml-[6px]" />
                          </span>
                      )}
            </div>
            <div className={`w-full flex ${top100 ? 'flex-wrap' : 'gap-7'}`}>
                {data?.items?.length > 0 &&
                    data?.items
                        ?.filter((i, index) => (top100 && viewType !== 'slider' ? index : index < 5))
                        .map((item, index) => <PlaylistItem key={item.encodeId} data={item} top100={top100} />)}
            </div>
        </div>
    )
}

export default memo(Playlist)
