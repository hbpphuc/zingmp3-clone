import React, { memo } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import icons from './Icons'
import * as musicAction from '../store/actions/'
import { Link } from 'react-router-dom'

const { FiMusic, BsCaretDownFill, BsCaretUpFill, TbMinus } = icons

const AlbumSongItem = ({ songData, isHideNoteIcon, isHideAlbumTitle, order, rankStt, isWeekChart }) => {
    const { curSongId } = useSelector((state) => state.music)
    const { currentWidth } = useSelector((state) => state.app)
    const dispatch = useDispatch()

    return (
        <div
            onClick={(e) => {
                e.stopPropagation()
                dispatch(musicAction.setCurSongId(songData?.encodeId))
                dispatch(musicAction.setPlaying(true))
                dispatch(musicAction.setRecentSongs({ data: songData }))
            }}
            className={`w-full h-[60px] ${
                isWeekChart ? 'p-[10px_5px]' : 'p-[10px]'
            } flex justify-between items-center gap-[10px] rounded-[5px] hover:bg-[#ffffff1a] ${
                curSongId === songData?.encodeId ? 'bg-active-song' : ''
            } border-b border-[#ffffff0d] cursor-pointer`}
        >
            <div className="flex-auto flex justify-start items-center">
                {order > 0 && (
                    <div
                        className={`${
                            isWeekChart ? 'w-[55px]' : 'w-[83px]'
                        } h-10 mr-[15px] flex justify-center items-center`}
                    >
                        <div
                            className={`zingchart-order ${
                                order === 1
                                    ? 'zc-order-1'
                                    : order === 2
                                    ? 'zc-order-2'
                                    : order === 3
                                    ? 'zc-order-3'
                                    : ''
                            }`}
                        >
                            <span>{order}</span>
                        </div>
                        {rankStt === 0 ? (
                            <div className="w-[23px] flex flex-col items-center justify-center ">
                                <span className="flex justify-center items-center">
                                    <TbMinus size={`${isWeekChart ? '12' : '20'}`} color="#ffffff80" />
                                </span>
                            </div>
                        ) : rankStt > 0 ? (
                            <div className="w-[23px] flex flex-col items-center justify-center ">
                                <span className="flex justify-center items-center">
                                    <BsCaretUpFill size={12} color="#1dc186" />
                                </span>
                                <span className="w-[18px] h-[18px] flex justify-center items-center text-xs font-bold">
                                    {rankStt}
                                </span>
                            </div>
                        ) : (
                            <div className="w-[23px] flex flex-col items-center justify-center ">
                                <span className="flex justify-center items-center">
                                    <BsCaretDownFill size={12} color="#e35050" />
                                </span>
                                <span className="w-[18px] h-[18px] flex justify-center items-center text-xs font-bold">
                                    {Math.abs(rankStt)}
                                </span>
                            </div>
                        )}
                    </div>
                )}
                {!isHideNoteIcon && (
                    <span className="w-[14px] mr-[10px] flex items-center text-[#ffffff80]">
                        <FiMusic size={14} />
                    </span>
                )}
                <div className="flex-auto flex justify-start items-center">
                    <div className="w-10 h-10 mr-[10px] rounded bg-slate-300">
                        <img src={songData.thumbnail} alt={songData.title} className=" rounded object-cover" />
                    </div>
                    <div className="flex-auto flex flex-col justify-center">
                        <p
                            className={`${
                                currentWidth > 1300 && isWeekChart ? 'w-[160px]' : 'w-full'
                            } text-sm font-medium text-white text-ellipsis line-clamp-1 overflow-hidden`}
                        >
                            {songData.title}
                        </p>
                        <div
                            className={`${
                                currentWidth > 1300 ? (isWeekChart ? 'w-[160px]' : 'w-full') : 'w-[200px]'
                            } mt-[1px] flex justify-start items-center text-xs text-[#ffffff80] text-ellipsis line-clamp-1 overflow-hidden`}
                        >
                            <span className="w-full flex items-center gap-1 overflow-hidden">
                                {songData?.artists?.map((item) => (
                                    <Link
                                        onClick={(e) => e.stopPropagation()}
                                        to={item.link}
                                        key={item.id}
                                        className="whitespace-nowrap cursor-pointer hover:text-purple-hover"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {!isHideAlbumTitle && (
                <div className="w-[35%] flex justify-start items-center line-clamp-1 overflow-hidden text-ellipsis">
                    <Link
                        onClick={(e) => e.stopPropagation()}
                        to={songData?.album?.link.split('.')[0]}
                        className="w-full font-medium whitespace-nowrap text-xs text-[#ffffff80] hover:text-purple-hover"
                    >
                        {songData?.album?.title}
                    </Link>
                </div>
            )}
            <div className="w-[10%] flex justify-end text-xs text-[#ffffff80] font-normal">
                {moment.utc(songData?.duration * 1000).format('mm:ss')}
            </div>
        </div>
    )
}

export default memo(AlbumSongItem)
