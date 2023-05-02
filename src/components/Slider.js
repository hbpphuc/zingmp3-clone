import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SSlider from 'react-slick'
import * as actions from '../store/actions'

const Slider = () => {
    const { banner } = useSelector((state) => state.app)
    const dispatch = useDispatch()
    console.log(banner)
    // const [curr, setCurr] = useState({
    //     activeSlide: 0,
    //     activeSlide2: 0,
    // })
    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        useCss: true,
        className: '',
        // beforeChange: (current, next) => setCurr({ activeSlide: next }),
        // afterChange: (current) => setCurr({ activeSlide2: current }),
    }

    const handleClickBanner = (item) => {
        if (item?.type === 4) {
            dispatch(actions.setCurSongId(item.encodeId))
        }
    }

    return (
        <div className="w-full h-full pt-8 overflow-hidden">
            <SSlider {...settings} className="w-full h-full text-white">
                {banner?.map((item) => (
                    <div key={item.encodeId} className="img-wrap">
                        <img
                            src={item.banner}
                            alt={item.title}
                            className="rounded-lg mr-2"
                            onClick={() => handleClickBanner(item)}
                        />
                    </div>
                ))}
            </SSlider>
            {/* <p className="text-white">
                BeforeChange - activeSlide: <strong>{curr.activeSlide}</strong>
            </p>
            <p className="text-white">
                AfterChange - activeSlide: <strong>{curr.activeSlide2}</strong>
            </p> */}
        </div>
    )
}

export default Slider
