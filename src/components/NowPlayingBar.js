import React, { memo, useEffect, useState } from 'react'
import Tippy from '@tippyjs/react'
import { useSelector } from 'react-redux'
import * as musicApi from '../apis/musicApi'
import icons from './Icons'
import SongItem from './SongItem'

const { AiOutlineDelete } = icons

const NowPlayingBar = () => {
    const { curSongData, curSongId, curAlbumId, isPlaying, recentSongs } = useSelector((state) => state.music)
    const [isRecent, setIsRecent] = useState(false)
    const [curAlbum, setCurAlbum] = useState(null)

    const fetchAlbum = async () => {
        const res = await musicApi.apiGetDetailPlaylist(curAlbumId)
        if (res?.err === 0) {
            setCurAlbum(res.data)
        }
    }

    useEffect(() => {
        curAlbumId && fetchAlbum()
    }, [])

    useEffect(() => {
        if (curAlbumId && isPlaying) fetchAlbum()
    }, [curAlbumId, isPlaying])

    useEffect(() => {
        isPlaying && setIsRecent(false)
    }, [isPlaying, curSongId])

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-[70px] flex items-center justify-between gap-2 p-[14px_8px] text-xs font-medium cursor-pointer">
                <div className="flex-1 flex justify-between items-center bg-[#ffffff1a] p-[3px] rounded-full">
                    <span
                        onClick={() => setIsRecent((prev) => !prev)}
                        className={`flex-1 flex justify-center items-center py-[5px] text-[#dadada] ${
                            !isRecent && 'bg-[#ffffff4d] rounded-full text-white'
                        } hover:text-white `}
                    >
                        Danh sách phát
                    </span>
                    <span
                        onClick={() => setIsRecent((prev) => !prev)}
                        className={`flex-1 flex justify-center items-center py-[5px] text-[#dadada] ${
                            isRecent && 'bg-[#ffffff4d] rounded-full text-white'
                        } hover:text-white  `}
                    >
                        Nghe gần đây
                    </span>
                </div>
                <Tippy content="Xóa danh sách phát" className="text-xs ml-5">
                    <button className="w-[40px] h-[40px] flex justify-center items-center rounded-full bg-[#ffffff1a] hover:bg-[#ffffff33]">
                        <AiOutlineDelete className="w-full h-full p-[10px] " />
                    </button>
                </Tippy>
            </div>
            {!isRecent ? (
                <div className="flex-1 flex flex-col p-[0_8px_15px] overflow-auto">
                    <div className="w-full">{curSongId && <SongItem data={curSongData} sm isActive />}</div>
                    <div className="w-full p-[15px_8px_5px]">
                        <h3 className="text-sm font-bold leading-normal">Tiếp theo</h3>
                        <h3 className="flex items-center gap-1 text-sm leading-normal ">
                            <span className="text-[#feffff99] font-normal">Từ playlist</span>
                            <span className="text-[#c273ed] font-medium text-ellipsis line-clamp-1 overflow-hidden cursor-pointer">
                                {curAlbum?.title}
                            </span>
                        </h3>
                    </div>
                    <div className="w-full">
                        {curAlbum &&
                            curAlbum?.song?.items?.map(
                                (item) =>
                                    item.encodeId !== curSongId && <SongItem key={item.encodeId} data={item} sm />,
                            )}
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col p-[0_8px_15px] overflow-auto">
                    <div className="w-full">
                        {recentSongs.length > 0 ? (
                            recentSongs?.map(
                                (item) =>
                                    item?.data?.encodeId !== curSongId && (
                                        <SongItem key={item?.data?.encodeId} data={item?.data} sm />
                                    ),
                            )
                        ) : (
                            <div className="w-full">Không có bài hát gần đây</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(NowPlayingBar)
