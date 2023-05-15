import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as musicAction from '../store/actions'
import icons from '../assets/icons/Icons'
import Button from './Button'
import SongItem from './SongItem'

const { MdOutlineArrowForwardIos } = icons

const NewRelease = () => {
    const { newRelease } = useSelector((state) => state.app)
    const dispatch = useDispatch()

    const [active, setActive] = useState(0)
    const [homeSongs, setHomeSongs] = useState([])

    useEffect(() => {
        if (active === 0) setHomeSongs(newRelease?.items?.all)
        if (active === 1) setHomeSongs(newRelease?.items?.vPop)
        if (active === 2) setHomeSongs(newRelease?.items?.others)
    }, [active, newRelease])

    return (
        <div className="text-white mt-12">
            <div className="w-full mb-5 flex justify-between items-center">
                <h3 className="text-xl capitalize font-bold">{newRelease.title}</h3>
                <span className="flex items-center text-xs text-[#ffffff80] uppercase font-medium cursor-pointer hover:purple-hover">
                    tất cả
                    <MdOutlineArrowForwardIos size={16} className="ml-[6px] button-active" />
                </span>
            </div>
            <div className="w-full mb-4 flex">
                <Button
                    onClick={() => {
                        setActive(0)
                        dispatch(musicAction.setPlaying(newRelease?.items?.all))
                    }}
                    text={'tất cả'}
                    style={active === 0 && 'btn-active'}
                />
                <Button
                    onClick={() => {
                        setActive(1)
                        dispatch(musicAction.setPlaying(newRelease?.items?.others))
                    }}
                    text={'việt nam'}
                    style={active === 1 && 'btn-active'}
                />
                <Button
                    onClick={() => {
                        setActive(2)
                        dispatch(musicAction.setPlaying(newRelease?.items?.vPop))
                    }}
                    text={'quốc tế'}
                    style={active === 2 && 'btn-active'}
                />
            </div>
            <div className="w-full flex justify-between flex-wrap">
                {homeSongs
                    ?.filter((item, index) => index < 12)
                    .map((item) => (
                        <SongItem key={item.encodeId} data={item} />
                    ))}
            </div>
        </div>
    )
}

export default NewRelease
