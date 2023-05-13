import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import icons from '../assets/icons/Icons'

const { MdOutlineArrowForwardIos } = icons

const Playlist = ({ data }) => {
    const navigate = useNavigate()
    const handleGetPath = (item) => {
        navigate(item?.link?.split('.')[0])
    }
    return (
        <div className="text-white mt-12">
            <div className="w-full mb-5 flex justify-between items-center">
                <h3 className="text-xl capitalize font-bold">{data?.title}</h3>
                <span className="flex items-center text-xs text-[#ffffff80] uppercase font-medium cursor-pointer hover:purple-hover">
                    tất cả
                    <MdOutlineArrowForwardIos size={16} className="ml-[6px]" />
                </span>
            </div>
            <div className="w-full flex gap-7">
                {data?.items?.length > 0 &&
                    data?.items?.slice(0, 5).map((item) => (
                        <div key={item.encodeId} className="w-1/5">
                            <div onClick={() => handleGetPath(item)} className="w-full  cursor-pointer">
                                <img src={item.thumbnailM} alt={item.title} className="w-full rounded object-cover" />
                            </div>
                            {item.sortDescription ? (
                                <p className="w-full mt-3 text-sm font-normal leading-[1.33] text-ellipsis line-clamp-2 text-[#ffffff80] cursor-default">
                                    {item.sortDescription}
                                </p>
                            ) : (
                                <p className="w-full mt-2 mb-1 text-sm font-bold leading-[1.33] text-ellipsis line-clamp-1 text-white cursor-pointer hover:purple-hover">
                                    {item.title}
                                </p>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default memo(Playlist)
