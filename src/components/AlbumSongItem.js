import React, { memo } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import icons from '../assets/icons/Icons'
import * as musicAction from '../store/actions/'

const { FiMusic } = icons

const AlbumSongItem = ({ songData, isAlbum }) => {
    const { curSongId } = useSelector((state) => state.music)
    const dispatch = useDispatch()
    return (
        <div
            onClick={() => {
                dispatch(musicAction.setCurSongId(songData?.encodeId))
                dispatch(musicAction.setPlaying(true))
            }}
            className={`w-full h-[60px] p-[10px] flex justify-between items-center gap-[10px] rounded-[5px] hover:bg-[#ffffff1a] ${
                curSongId === songData?.encodeId ? 'bg-active-song' : ''
            } border-b border-[#ffffff0d] cursor-pointer`}
        >
            <div className="flex-auto flex justify-start items-center">
                {!isAlbum && (
                    <span className="w-[14px] mr-[10px] flex items-center text-[#ffffff80]">
                        <FiMusic size={14} />
                    </span>
                )}
                <div className="flex-auto flex justify-start items-center">
                    <div className="w-10 h-10 mr-[10px] rounded bg-slate-300">
                        <img src={songData.thumbnail} alt={songData.title} className=" rounded object-cover" />
                    </div>
                    <div className="flex-auto flex flex-col justify-center">
                        <p className="w-full min-[1280px]:max-w-full min-[1200px]:max-w-[200px] text-sm font-medium text-white whitespace-nowrap text-ellipsis overflow-hidden">
                            {songData.title}
                        </p>
                        <div className="max-w-full mt-[1px] flex justify-start items-center text-xs text-[#ffffff80]">
                            <span className="hover:text-purple-hover">{songData.artistsNames}</span>
                        </div>
                    </div>
                </div>
            </div>
            {!isAlbum && (
                <div className="w-[35%] flex justify-start items-center">
                    <span className="w-full font-normal whitespace-nowrap text-sm text-ellipsis text-[#ffffff80] overflow-hidden">
                        {songData?.album?.title}
                    </span>
                </div>
            )}
            <div className="w-[10%] flex justify-end text-xs text-[#ffffff80] font-normal">
                {moment.utc(songData?.duration * 1000).format('mm:ss')}
            </div>
        </div>
    )
}

export default memo(AlbumSongItem)
