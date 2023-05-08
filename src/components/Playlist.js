import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import icons from '../assets/icons/Icons'

const { MdOutlineArrowForwardIos } = icons

const Playlist = () => {
    const { hEditorTheme } = useSelector((state) => state.app)
    const navigate = useNavigate()
    const handleGetPath = (item) => {
        navigate(item?.link?.split('.')[0])
    }
    return (
        <div className="text-white mt-12">
            <div className="w-full mb-5 flex justify-between items-center">
                <h3 className="text-xl capitalize font-bold">{hEditorTheme?.title}</h3>
                <span className="flex items-center text-xs text-[#ffffff80] uppercase font-medium cursor-pointer hover:purple-hover">
                    tất cả
                    <MdOutlineArrowForwardIos size={16} className="ml-[6px]" />
                </span>
            </div>
            <div className="w-full flex gap-7">
                {hEditorTheme?.items?.length > 0 &&
                    hEditorTheme?.items?.slice(0, 5).map((item) => (
                        <div key={item.encodeId} onClick={() => handleGetPath(item)} className="w-1/5 cursor-pointer">
                            <div className="w-full">
                                <img src={item.thumbnailM} alt={item.title} className="w-full rounded object-cover" />
                            </div>
                            <p className="w-full mt-3 text-sm font-normal leading-[1.33] text-[#ffffff80] cursor-text">
                                {item.sortDescription}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default memo(Playlist)
