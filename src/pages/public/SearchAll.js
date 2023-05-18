import React from 'react'
import { useSelector } from 'react-redux'
import { formatFollow } from '../../utils/helper'
import { AlbumSongItem, Artist } from '../../components'
import icons from '../../assets/icons/Icons'
import HPlaylistItem from '../../components/HPlaylistItem'

const { MdOutlineArrowForwardIos } = icons

const SearchAll = () => {
    const { searchData } = useSelector((state) => state.music)

    return (
        <div className="w-full h-[400px] flex flex-col">
            <div className="w-full flex flex-col justify-start items-start">
                <h3 className="flex justify-start items-center mb-5 text-xl font-bold">Nổi Bật</h3>
                <div className="w-full flex justify-between items-center gap-7">
                    {searchData?.top ? (
                        <div className="flex-1 flex items-center p-[10px] bg-[#feffff0d] rounded">
                            <div className="w-[84px] h-[84px] mr-[10px] flex items-center">
                                <img
                                    src={searchData?.top?.thumbnail}
                                    alt={searchData?.top?.name}
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <div className="flex-1 flex flex-col ml-[6px]">
                                <span className="mb-[6px] text-xs text-[#ffffff80] font-normal leading-[18px] whitespace-nowrap">
                                    {searchData?.top?.objectType === 'artist' ? 'Nghệ sĩ' : 'Bài hát'}
                                </span>
                                <span className="w-full text-sm font-semibold overflow-hidden text-ellipsis line-clamp-1">
                                    {searchData?.top?.objectType === 'artist'
                                        ? searchData?.top.name
                                        : searchData?.top.title}
                                </span>
                                {searchData?.top?.objectType === 'artist' ? (
                                    <span className="mt-[2px] text-xs text-[#ffffff80] font-normal leading-[18px] whitespace-nowrap">
                                        {formatFollow(searchData?.artists[0].totalFollow)} quan tâm
                                    </span>
                                ) : (
                                    <span className="mt-[2px] text-xs text-[#ffffff80] font-normal leading-[18px] whitespace-nowrap">
                                        {searchData?.top.artistsNames}
                                    </span>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center p-[10px] bg-[#feffff0d] rounded">
                            <div className="w-[84px] h-[84px] mr-[10px] flex items-center">
                                <img
                                    src={searchData?.songs[0]?.thumbnailM}
                                    alt={searchData?.songs[0]?.title}
                                    className="rounded object-cover"
                                />
                            </div>
                            <div className="flex-1 flex flex-col ml-[6px]">
                                <span className="mb-[6px] text-xs text-[#ffffff80] font-normal leading-[18px] whitespace-nowrap">
                                    Bài hát
                                </span>
                                <span className="w-full text-sm font-semibold overflow-hidden text-ellipsis line-clamp-1">
                                    {searchData?.songs[0].title}
                                </span>
                                <span className="mt-[2px] text-xs text-[#ffffff80] font-normal leading-[18px] whitespace-nowrap">
                                    {searchData?.songs[0]?.artistsNames}
                                </span>
                            </div>
                        </div>
                    )}
                    {searchData?.songs.slice(0, 2).map((item) => (
                        <div className="flex-1 flex items-center p-[10px] bg-[#feffff0d] rounded cursor-default">
                            <div className="w-[84px] h-[84px] mr-[10px] flex items-center">
                                <img src={item.thumbnailM} alt={item.title} className="rounded object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col ml-[6px]">
                                <span className="mb-[6px] text-xs text-[#ffffff80] font-normal leading-[18px] whitespace-nowrap">
                                    Bài hát
                                </span>
                                <span className="w-full text-sm font-semibold overflow-hidden text-ellipsis line-clamp-1">
                                    {item.title}
                                </span>
                                <span className="mt-[2px] text-xs text-[#ffffff80] font-normal leading-[18px] whitespace-nowrap">
                                    {item.artistsNames}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full mt-12 flex flex-col justify-start items-start">
                <h3 className="w-full mb-5 flex justify-between items-center">
                    <span className="text-xl font-bold">Bài hát</span>
                    <span className="flex items-center text-xs text-[#ffffff80] uppercase font-medium cursor-pointer hover:purple-hover">
                        tất cả
                        <MdOutlineArrowForwardIos size={16} className="ml-[6px]" />
                    </span>
                </h3>
                <div className="w-full flex justify-between items-center flex-wrap">
                    {searchData?.songs.slice(0, 6).map((item, index) => (
                        <div
                            className={`w-full min-[1200px]:w-1/2 flex ${index % 2 === 0 ? 'pr-3' : 'pl-3'}`}
                            key={index}
                        >
                            <AlbumSongItem songData={item} isAlbum />
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full mt-12 flex flex-col justify-start items-start">
                <h3 className="w-full mb-5 flex justify-between items-center">
                    <span className="text-xl font-bold">Playlist/Album</span>
                    <span className="flex items-center text-xs text-[#ffffff80] uppercase font-medium cursor-pointer hover:purple-hover">
                        tất cả
                        <MdOutlineArrowForwardIos size={16} className="ml-[6px]" />
                    </span>
                </h3>
                <div className="w-full flex gap-7">
                    {searchData?.playlists?.length > 0 &&
                        searchData?.playlists
                            ?.slice(0, 5)
                            .map((item) => <HPlaylistItem key={item.encodeId} data={item} />)}
                </div>
            </div>

            <div className="w-full mt-12 flex flex-col justify-start items-start">
                <h3 className="w-full mb-5 flex justify-between items-center">
                    <span className="text-xl font-bold">Nghệ sĩ/OA</span>
                    <span className="flex items-center text-xs text-[#ffffff80] uppercase font-medium cursor-pointer hover:purple-hover">
                        tất cả
                        <MdOutlineArrowForwardIos size={16} className="ml-[6px]" />
                    </span>
                </h3>
                <div className="w-full flex">
                    {searchData?.artists?.length > 0 &&
                        searchData?.artists
                            .filter((i, index) => index <= 4)
                            .map((item) => (
                                <div key={item.encodeId} className="w-[20%] artist">
                                    <Artist data={item} />
                                </div>
                            ))}
                </div>
            </div>
        </div>
    )
}

export default SearchAll
