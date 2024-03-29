import React, { useState, useRef, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as musicAction from '../store/actions'
import Tippy from '@tippyjs/react'
import icons from './Icons'

const { RiHeartLine, RiHeartFill, RiMoreFill, TbPlayerPlayFilled } = icons

const PlaylistItem = ({ data, top100 }) => {
    const navigate = useNavigate()
    const [isHover, setIsHover] = useState(false)
    const imageRef = useRef()

    const handleGetPath = (item) => {
        navigate(item?.link?.split('.')[0], { state: { playAlbum: false, albumId: data?.encodeId } })
    }

    const handleImageEnter = () => {
        imageRef.current.classList.add('animate-scale-image')
        imageRef.current.classList.remove('animate-unscale-image')
        setIsHover(true)
    }
    const handleImageLeave = () => {
        imageRef.current.classList.add('animate-unscale-image')
        imageRef.current.classList.remove('animate-scale-image')
        setIsHover(false)
    }

    return (
        <div className={`w-1/4 min-[1300px]:w-1/5 mb-[30px] ${top100 && 'pr-7'}`}>
            <div
                onClick={() => handleGetPath(data)}
                onMouseEnter={handleImageEnter}
                onMouseLeave={handleImageLeave}
                className="w-full cursor-pointer relative overflow-hidden rounded"
            >
                {isHover && (
                    <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center gap-5 bg-[#00000080] rounded z-20">
                        <div className="w-9 h-8 flex justify-center items-center">
                            <Tippy content="Thêm vào thư viện" className="text-xs">
                                <button className="w-[32px] h-[32px] flex justify-center items-center">
                                    <RiHeartLine className="w-full h-full p-[7px] hover:button-player" />
                                </button>
                            </Tippy>
                        </div>
                        <div
                            title={data.title}
                            className="w-[40px] h-[40px] p-[5px] flex justify-center items-center rounded-full border border-white hover:opacity-80"
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    navigate(data?.link?.split('.')[0], {
                                        state: { playAlbum: true, albumId: data?.encodeId },
                                    })
                                }}
                                className="w-full h-full flex justify-center items-center"
                            >
                                <TbPlayerPlayFilled className="w-full h-full p-[3px]" />
                            </button>
                        </div>
                        <div className="w-9 h-8 flex justify-center items-center">
                            <Tippy content="Khác" className="text-xs">
                                <button className="w-[32px] h-[32px] flex justify-center items-center">
                                    <RiMoreFill className="w-full h-full p-[7px] hover:button-player" />
                                </button>
                            </Tippy>
                        </div>
                    </div>
                )}
                <img ref={imageRef} src={data.thumbnailM} alt={data.title} className="w-full rounded object-cover" />
            </div>
            {data.sortDescription ? (
                <p className="w-full mt-3 text-sm font-normal leading-[1.33] text-ellipsis line-clamp-2 text-[#ffffff80] cursor-default">
                    {data.sortDescription}
                </p>
            ) : (
                <p className="w-full mt-2 mb-1 text-sm font-bold leading-[1.33] text-ellipsis line-clamp-1 text-white cursor-pointer hover:purple-hover">
                    {data.title}
                </p>
            )}
        </div>
    )
}

export default memo(PlaylistItem)
