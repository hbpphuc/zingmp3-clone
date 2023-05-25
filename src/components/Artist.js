import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import icons from './Icons'
import { formatFollow } from '../utils/helper'
import Button from './Button'

const { AiOutlineUserAdd, TbArrowsShuffle } = icons

const Artist = ({ data }) => {
    const [isHover, setIsHover] = useState(false)
    const imageRef = useRef()

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
        <div className="w-full flex gap-1">
            <div className="w-[90%] flex flex-col justify-center items-center gap-2 overflow-hidden">
                <div className="w-full">
                    <Link
                        to={data.link}
                        onMouseEnter={handleImageEnter}
                        onMouseLeave={handleImageLeave}
                        className="w-full flex justify-center items-center relative rounded-full overflow-hidden"
                    >
                        {isHover && (
                            <div
                                title={data.name}
                                className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center hover:bg-[#00000020] rounded-full z-20"
                            >
                                <div className="p-3 border rounded-full">
                                    <TbArrowsShuffle size={28} />
                                </div>
                            </div>
                        )}
                        <img
                            ref={imageRef}
                            src={data.thumbnailM}
                            alt={data.alias}
                            className="w-full rounded-full object-contain"
                        />
                    </Link>
                </div>
                <div className="mt-[15px] flex flex-col items-center justify-center">
                    <Link
                        to={data.link}
                        className="mb-1 text-sm font-medium leading-[1.36] overflow-hidden text-ellipsis hover:text-purple-hover"
                    >
                        {data.name}
                    </Link>
                    <span className="text-xs font-normal leading-[1.33] text-[#ffffff80] cursor-default">
                        {formatFollow(data.totalFollow)} quan tâm
                    </span>
                </div>
                <div>
                    <Button
                        leftIcon={<AiOutlineUserAdd size={14} />}
                        text={'Quan tâm'}
                        style={'text-xs uppercase bg-[#ffffff1a]'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Artist
