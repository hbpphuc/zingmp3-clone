import React from 'react'
import icons from '../assets/icons/Icons'
import { formatFollow } from '../utils/helper'
import Button from './Button'

const { AiOutlineUserAdd } = icons

const Artist = ({ data }) => {
    return (
        <div className="w-full flex gap-1">
            <div className="w-[90%] flex flex-col justify-center items-center gap-2">
                <div className="w-full flex justify-center items-center">
                    <img src={data.thumbnailM} alt={data.alias} className="w-full rounded-full object-contain" />
                </div>
                <div className="mt-[15px] flex flex-col items-center justify-center">
                    <span className="mb-1 text-sm font-medium leading-[1.36] overflow-hidden text-ellipsis">
                        {data.name}
                    </span>
                    <span className="text-xs font-normal leading-[1.33] text-[#ffffff80]">
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
