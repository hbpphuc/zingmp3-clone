import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SSlider from 'react-slick'
import * as actions from '../store/actions'

const Slider = () => {
    const { banner } = useSelector((state) => state.app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sliderRef = useRef()

    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    }

    const handleClickBanner = (item) => {
        if (item?.type === 1) {
            dispatch(actions.setCurSongId(item.encodeId))
            dispatch(actions.setPlaying(true))
        } else if (item?.type === 4) {
            const path = item?.link.split('.')[0]
            navigate(path)
        } else {
        }
    }

    return (
        <div ref={sliderRef} className="w-full h-max mb-5 pt-8 cursor-pointer">
            <SSlider {...settings}>
                {banner?.map((item) => (
                    <div key={item.encodeId} className="w-full">
                        <img
                            src={item.banner}
                            alt={item.title}
                            className="object-cover rounded-lg"
                            onClick={() => handleClickBanner(item)}
                        />
                    </div>
                ))}
            </SSlider>
        </div>
    )
}

export default Slider
