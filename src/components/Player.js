import React from 'react'
import { useSelector } from 'react-redux'

const Player = () => {
    const { curSongId } = useSelector((state) => state.music)

    console.log(curSongId)

    return (
        <div className="min-w-[768px] h-[90px] flex justify-between items-center">
            <div className="w-[30%] max-h-full flex-auto border border-red-400">detail song</div>
            <div className="w-[40%] max-h-full flex-auto border border-red-400">main player</div>
            <div className="w-[30%] max-h-full flex-auto border border-red-400">player tool</div>
        </div>
    )
}

export default Player
