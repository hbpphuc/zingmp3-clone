import React, { memo, useEffect, useState } from 'react'
import AlbumSongItem from './AlbumSongItem'
import Button from './Button'

const RankList = ({ data, isHideAlbumTitle, limit, isWeekChart, linkTo }) => {
    const [showFull, setShowFull] = useState(false)
    const [rankSongs, setRankSongs] = useState(null)

    useEffect(() => {
        if (!showFull) {
            if (limit < 0) {
                setRankSongs(data)
            } else {
                setRankSongs(data?.filter((i, index) => index < limit))
            }
        } else {
            setRankSongs(data)
        }
    }, [showFull, data])

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full mb-5 flex flex-col justify-center items-center">
                {rankSongs?.map((item, index) => (
                    <AlbumSongItem
                        key={item.encodeId}
                        songData={item}
                        order={index + 1}
                        rankStt={item.rakingStatus}
                        isHideNoteIcon
                        isHideAlbumTitle={isHideAlbumTitle}
                        isWeekChart={isWeekChart}
                    />
                ))}
            </div>
            {limit > 0 && (
                <Button
                    onClick={() => setShowFull((prev) => !prev)}
                    to={linkTo}
                    text={`${showFull ? 'Ẩn bớt' : isWeekChart ? 'Xem tất cả' : 'Xem top 100'}`}
                    style={'border-white text-sm font-medium p-[8px_25px] hover:bg-[#ffffff1a]'}
                />
            )}
        </div>
    )
}

export default memo(RankList)
