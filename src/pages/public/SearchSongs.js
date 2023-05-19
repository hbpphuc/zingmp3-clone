import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AlbumSongItem } from '../../components'
import * as musicAction from '../../store/actions'

const SearchSongs = () => {
    const { searchData, artistSong } = useSelector((state) => state.music)
    const dispatch = useDispatch()
    console.log({ searchData, artistSong })

    useEffect(() => {
        dispatch(musicAction.getArtistSong(searchData?.top?.id))
    }, [])

    return (
        <div>
            <h3 className="flex justify-start items-center mb-[10px] text-xl font-bold">Bài hát</h3>
            <div className="w-full flex justify-between items-center flex-wrap">
                {artistSong?.items?.map((item, index) => (
                    <div className={`w-full`} key={index}>
                        <AlbumSongItem songData={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchSongs
