import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const HWeekChart = ({ data }) => {
    return (
        <div className="w-full mt-7 mb-[30px] pt-10 flex justify-between items-center gap-8">
            {data.map((item) => (
                <Link to={item.link.split('.')[0]} key={item.link} className="w-1/3">
                    <img src={item.cover} alt={item.country} className="rounded object-cover" />
                </Link>
            ))}
        </div>
    )
}

export default memo(HWeekChart)
