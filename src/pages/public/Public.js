import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Sidebar } from '../../layouts'
import { Player } from '../../components'

const Public = () => {
    return (
        <div className="w-full min-h-full flex flex-col overflow-y-auto relative">
            <div className="flex-auto w-full max-h-full flex overflow-y-auto relative">
                <div className="w-[240px] h-full bg-[#ffffff0d] fixed">
                    <Sidebar />
                </div>
                <div className="w-[calc(100%_-_240px)] h-[70px] absolute right-0">
                    <div className="min-w-[660px] h-[70px] px-[59px] flex items-center fixed left-[240px] top-0 right-0 text-white backdrop-blur-[50px] bg-[#170f23cc] shadow-[0_3px_5px_rgba(0,0,0,0.1)] z-50">
                        <Header />
                    </div>
                    <Outlet />
                </div>
            </div>
            {true && (
                <div className="flex-none w-full h-[90px] px-5 relative left-0 right-0 bottom-0 bg-[#130c1c] text-white border-t-1 border-[#ffffff1a]">
                    <Player />
                </div>
            )}
        </div>
    )
}

export default Public
