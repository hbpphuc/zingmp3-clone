import React, { useState, useEffect, useRef } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Header, Sidebar } from '../../layouts'
import { NowPlayingBar, Player } from '../../components'

const Public = () => {
    const { curSongId } = useSelector((state) => state.music)
    const { isPLayingBar } = useSelector((state) => state.app)

    const { singer } = useParams()
    const [scrollTop, setScrollTop] = useState(true)
    const ref = useRef()

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    }, [])

    const handleScroll = (e) => {
        if (e.target.scrollTop <= 300) {
            setScrollTop(true)
        } else {
            setScrollTop(false)
        }
    }

    return (
        <div ref={ref} className="w-full min-h-full flex flex-col overflow-y-auto relative">
            <div onScroll={handleScroll} className="flex-auto w-full max-h-full flex overflow-y-auto relative ">
                <div className="w-[240px] h-full bg-[#ffffff0d] fixed">
                    <Sidebar />
                </div>
                <div
                    className={`main-header ${
                        singer && scrollTop
                            ? 'bg-gradient-to-t from-[#0e131a00] to-[#4e5053]'
                            : 'backdrop-blur-[50px] bg-[#170f23cc] shadow-[0_3px_5px_rgba(0,0,0,0.1)]'
                    }`}
                >
                    <Header />
                </div>
                <div className="w-[calc(100%_-_240px)] text-white px-[59px] absolute right-0">
                    <div className="w-full mt-[70px]">
                        <Outlet />
                    </div>
                </div>
            </div>
            {curSongId && (
                <div className="flex-none w-full h-[90px] px-5 relative left-0 right-0 bottom-0 bg-[#130c1c] text-white border-t-1 border-[#ffffff1a]">
                    <Player />
                </div>
            )}
            {isPLayingBar && (
                <div className="w-[330px] h-[calc(100%_-_90px)] absolute top-0 right-0 bg-[#120822] z-[60] text-white">
                    <NowPlayingBar />
                </div>
            )}
        </div>
    )
}

export default Public
