import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment/moment'
import * as musicApi from '../../apis/musicApi'
import { AlbumSongList } from '../../components'

const Album = () => {
    const { title, pid } = useParams()
    const [playlistData, setPlaylistData] = useState({})

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            const res = await musicApi.apiGetDetailPlaylist(pid)
            if (res?.err === 0) {
                setPlaylistData(res.data)
            }
        }

        fetchDetailPlaylist()
    }, [pid])

    return (
        <div className="w-full px-[59px] pt-10 mt-[70px] flex flex-col text-white relative">
            <div className="w-full my-[30px] flex gap-7 relative">
                <div className="flex-auto h-[540px] pb-[30px] sticky top-[110px]">
                    <div className="w-[300px] h-auto rounded-lg shadow-[0_5px_8px_0_rgba(0,0,0,0.2)] overflow-hidden hover:thumbnailM-hover">
                        <img
                            src={playlistData.thumbnailM}
                            alt={playlistData.title}
                            className="w-full h-full object-cover rounded-lg transition-[scale-thumb]"
                        />
                    </div>
                    <div className="w-full mt-3 flex flex-col items-center">
                        <div className="flex flex-col items-center">
                            <h3 className="text-xl font-bold">{playlistData.title}</h3>
                            <div className="flex flex-col items-center">
                                <p className="text-xs text-[#ffffff80] leading-[1.75]">
                                    Cập nhật: {moment.unix(playlistData.contentLastUpdate).format('DD/MM/YYYY')}
                                </p>
                                <p className="text-xs text-[#ffffff80] leading-[1.75] hover:singer-hover">
                                    {playlistData.artistsNames}
                                </p>
                                <p className="text-xs text-[#ffffff80] leading-[1.75]">
                                    {Math.floor(playlistData.like / 1000)}K người yêu thích
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[calc(100%_-_330px)]">
                    <div className="mb-[10px]">
                        <span className="text-sm text-[#ffffff80]">Lời tựa </span>
                        <span className="text-sm text-white">{playlistData.sortDescription}</span>
                    </div>
                    <AlbumSongList listSong={playlistData?.song} />
                </div>
            </div>
            <div>ARTIST CHANNEL</div>
            <div>ARTIST PLAYLIST</div>
        </div>
    )
}

export default Album
