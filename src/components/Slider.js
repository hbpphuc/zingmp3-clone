import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SSlider from 'react-slick'

const Slider = () => {
    const { banner } = useSelector((state) => state.app)
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

    return (
        <div className="w-full h-full pt-8 overflow-hidden">
            <SSlider {...settings} className="w-full h-full text-white">
                {banner?.map((item) => (
                    <div key={item.encodeId} className="img-wrap">
                        <img src={item.banner} alt={item.title} className="rounded-lg mr-2" />
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
