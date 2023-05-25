import Tippy from '@tippyjs/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as musicApi from '../../apis/musicApi'
import * as homeAction from '../../store/actions'
import { AlbumSongItem, Artist, Button, Icons, Loading } from '../../components'
import { ZingAward } from '../../components/Images'
import PlaylistItem from '../../components/PlaylistItem'

const { AiOutlineUserAdd, TbPlayerPlayFilled, TbPlayerPauseFilled, MdOutlineArrowForwardIos } = Icons

const Singer = () => {
    const { singer } = useParams()
    const { currentWidth, isLoading } = useSelector((state) => state.app)
    const dispatch = useDispatch()

    const [artist, setArtist] = useState(null)
    const ref = useRef()

    useEffect(() => {
        const fetchArtist = async () => {
            dispatch(homeAction.loading(true))
            const result = await musicApi.apiGetArtist(singer)
            if (result.err === 0) {
                setArtist(result.data)
            }
            dispatch(homeAction.loading(false))
        }
        singer && fetchArtist()
    }, [singer])

    useEffect(() => {
        ref.current.scrollIntoView()
    }, [])

    return (
        <div ref={ref} className="w-full h-auto flex flex-col">
            {isLoading && (
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#170f23] z-10">
                    <div className="w-creen h-screen flex justify-center items-center ">
                        <Loading />
                    </div>
                </div>
            )}
            <div className="w-full h-[360px] mb-[30px]">
                <div className="flex flex-col absolute left-0 right-0 top-0">
                    <img src={artist?.cover} alt={artist?.alias} className="w-full object-cover" />
                    <div className="w-full px-[59px] pb-6 absolute bottom-0 bg-gradient-to-b from-[#00000000] to-[#00000080]">
                        <div className="w-full max-h-[72px] mb-4 flex items-center gap-4">
                            <h1 className="text-[60px] font-bold text-[#feffff] drop-shadow-[0_1px_4px_rgba(0,0,0,.16)]">
                                {artist?.name}
                            </h1>
                            <span className="w-[52px] h-[52px] relative bg-white rounded-full cursor-pointer">
                                <span className="flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 rounded-full text-[#9b4de0] hover:text-white bg-transparent z-[3] btn-was-hover">
                                    <TbPlayerPlayFilled size={28} className />
                                </span>
                                <span className="w-full h-full absolute top-0 right-0 bottom-0 left-0 rounded-full z-[2] btn-bg-scale"></span>
                            </span>
                        </div>
                        <div className="w-full flex items-center gap-6 ">
                            <span className="text-sm font-medium text-[#feffffcc]">
                                {Number(artist?.follow?.toFixed(1)).toLocaleString()} người quan tâm
                            </span>
                            <div>
                                <Button
                                    leftIcon={<AiOutlineUserAdd size={14} />}
                                    text={'Quan tâm'}
                                    style="text-sm text-[#feffff] uppercase bg-[#feffff1a] border-[#feffff33] hover:brightness-90"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col justify-start items-start">
                <div className="w-full flex flex-col justify-start items-start">
                    <h3 className="w-full mb-5 flex justify-between items-center">
                        <span className="text-xl font-bold">Bài hát nổi bật</span>
                        <span className="flex items-center text-xs text-[#ffffff80] uppercase font-medium cursor-pointer hover:purple-hover">
                            tất cả
                            <MdOutlineArrowForwardIos size={16} className="ml-[6px]" />
                        </span>
                    </h3>
                    <div className="w-full flex justify-between items-center flex-wrap">
                        {artist?.sections
                            ?.find((item) => item.sectionType === 'song')
                            .items.slice(0, 6)
                            .map((item, index) => (
                                <div className={`w-full min-[1200px]:w-1/2 flex`} key={index}>
                                    <AlbumSongItem songData={item} isHideNoteIcon isHideAlbumTitle />
                                </div>
                            ))}
                    </div>
                </div>
                {artist?.sections
                    ?.filter((item) => item.sectionType === 'playlist')
                    ?.map((item, index) => (
                        <div key={item.encodeId} className="w-full mt-12 flex flex-col justify-start items-start">
                            <h3 className="w-full mb-5 flex justify-between items-center">
                                <span className="text-xl font-bold">{item.title}</span>
                                <span className="flex items-center text-xs text-[#ffffff80] uppercase font-medium cursor-pointer hover:purple-hover">
                                    tất cả
                                    <MdOutlineArrowForwardIos size={16} className="ml-[6px]" />
                                </span>
                            </h3>
                            <div className="w-full flex gap-7">
                                {item?.items.length > 0 &&
                                    item.items
                                        ?.filter((i, index) => (currentWidth > 1300 ? index < 5 : index < 4))
                                        .map((item) => <PlaylistItem key={item.encodeId} data={item} />)}
                            </div>
                        </div>
                    ))}
                {artist?.sections
                    ?.filter((item) => item.sectionType === 'artist')
                    ?.map((item, index) => (
                        <div key={item.encodeId} className="w-full mt-12 flex flex-col justify-start items-start">
                            <h3 className="w-full mb-5 flex justify-between items-center">
                                <span className="text-xl font-bold">{item.title}</span>
                                <span className="flex items-center text-xs text-[#ffffff80] uppercase font-medium cursor-pointer hover:purple-hover">
                                    tất cả
                                    <MdOutlineArrowForwardIos size={16} className="ml-[6px]" />
                                </span>
                            </h3>
                            <div className="w-full flex">
                                {item?.items
                                    .filter((i, index) => (currentWidth > 1300 ? index < 5 : index < 4))
                                    .map((item) => (
                                        <div
                                            key={item.encodeId}
                                            className={`artist ${currentWidth > 1300 ? 'w-[20%]' : 'w-[25%]'}`}
                                        >
                                            <Artist data={item} />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                <div className="w-full mt-12 flex flex-col">
                    <h3 className="w-full mb-5 flex justify-between items-center">
                        <span className="text-xl font-bold">Về {artist?.name}</span>
                    </h3>
                    <div className="w-[90%] flex gap-7">
                        <div className="flex-1 h-[304.238px] rounded-lg">
                            <img
                                src={artist?.thumbnailM}
                                alt={artist?.name}
                                className="w-full h-full rounded-lg object-cover object-[50%_20%]"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="mb-12 text-sm font-normal text-[#ffffff80] text-ellipsis overflow-hidden line-clamp-[7]">
                                <p dangerouslySetInnerHTML={{ __html: artist?.biography }}></p>
                                <span className="text-xs font-bold text-[#feffffcc] uppercase leading-[1.92] cursor-pointer">
                                    xem thêm
                                </span>
                            </div>
                            <div className="w-full flex items-center gap-[52px]">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xl font-bold leading-6">
                                        {Number(artist?.follow?.toFixed(1)).toLocaleString()}
                                    </span>
                                    <span className="text-sm font-normal text-[#ffffff80]">Người quan tâm</span>
                                </div>
                                {artist?.awards && (
                                    <div className="flex gap-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xl font-bold leading-6">
                                                {artist?.awards?.length}
                                            </span>
                                            <span className="text-sm font-normal text-[#ffffff80]">Giải thưởng</span>
                                        </div>
                                        <Tippy
                                            content={`${artist?.awards}`.replaceAll(', ', '\n')}
                                            className={'whitespace-pre-line'}
                                        >
                                            <div className="w-[42px] h-[44px] text-[#feffffcc] hover:brightness-90">
                                                <ZingAward />
                                            </div>
                                        </Tippy>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Singer
