import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Chart } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import routes from '../utils/routes'
import icons from './Icons'
import SongItem from './SongItem'
import Button from './Button'

const { MdPlayCircle } = icons

const HZingChart = () => {
    const { hZCRank, hZChart } = useSelector((state) => state.app)
    const [data, setData] = useState(null)
    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
                    display: false,
                    autoSkip: true,
                    maxTicksLimit: 5,
                },
                grid: { color: 'gray', drawTicks: false },
                border: { dash: [2, 4] },
                min: hZChart?.minScore,
                max: hZChart?.maxScore,
            },
            x: {
                ticks: { color: '#a0a0a0' },
                grid: { color: 'transparent' },
            },
        },
        plugins: {
            legend: false,
        },
        hover: {
            mode: 'dataset',
            intersect: false,
        },
    }

    useEffect(() => {
        const labels = hZChart?.times?.filter((i) => +i.hour % 2 === 0)?.map((item) => `${item.hour}:00`)
        const datasets = []
        if (hZChart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: hZChart?.items[Object.keys(hZChart?.items)[i]]
                        ?.filter((i) => +i.hour % 2 === 0)
                        ?.map((item) => item.counter),
                    borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    tension: 0.3,
                    borderWidth: 2,
                    pointHoverRadius: 6,
                    pointBackgroundColor: 'white',
                    pointHitRadius: 6,
                    pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    animation: false,
                    pointHoverBorderWidth: 4,
                })
            }
            setData({ labels, datasets })
        }
    }, [hZChart])

    return (
        <div className="w-full h-[413px] mt-[48px] rounded-lg overflow-hidden relative bg-[#2b273f]">
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#33104cf2]">
                <div className="zingchart-top-alpha"></div>
                <div className="zingchart-bottom-alpha"></div>
            </div>
            <div className="absolute top-0 right-0 bottom-0 left-0 p-5 flex flex-col">
                <div className="mb-5 flex items-center gap-2 text-[28px] font-bold leading-normal text-white">
                    <Link to={routes.ZING_CHART} className="zingchart-text">
                        #zingchart
                    </Link>
                    <span className="cursor-pointer hover:opacity-90">
                        <MdPlayCircle size={30} className="text-white" />
                    </span>
                </div>
                <div className="h-full flex justify-center gap-7">
                    <div className="flex-4 flex flex-col items-center">
                        {hZCRank.slice(0, 3).map((item, index) => (
                            <div
                                key={item.encodeId}
                                className="w-full h-[80px] rounded mb-[10px] bg-[hsla(0,0%,100%,.07)] text-white"
                            >
                                <SongItem
                                    data={item}
                                    order={index + 1}
                                    percent={`${Math.round((item.score / hZChart.totalScore) * 100)}%`}
                                />
                            </div>
                        ))}
                        <Button
                            text={'Xem thêm'}
                            to={routes.ZING_CHART}
                            style={'py-[0.5rem] mt-[5px] mr-0 border border-white hover:bg-[#ffffff1a]'}
                        />
                    </div>
                    <div className="flex-6 h-full ">{data && <Line data={data} options={options} />}</div>
                </div>
            </div>
        </div>
    )
}

export default HZingChart
