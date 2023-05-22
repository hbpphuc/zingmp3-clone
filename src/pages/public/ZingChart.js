import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Chart } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import * as homeApi from '../../apis/homeApi'
import { AlbumSongItem, Button, Icons, RankList } from '../../components'

const { MdPlayCircle } = Icons

const ZingChart = () => {
    const [ZChart, setZChart] = useState({})
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
                    maxTicksLimit: 4,
                },
                grid: { color: 'gray', drawTicks: false },
                border: { dash: [2, 4] },
                min: ZChart?.RTChart?.chart?.minScore,
                max: ZChart?.RTChart?.chart?.maxScore,
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
        const fetchChart = async () => {
            const result = await homeApi.getChartHome()
            setZChart(result.data)
        }
        fetchChart()
    }, [])

    useEffect(() => {
        const labels = ZChart?.RTChart?.chart?.times?.filter((i) => +i.hour % 2 === 0)?.map((item) => `${item.hour}:00`)
        const datasets = []
        if (ZChart?.RTChart?.chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: ZChart?.RTChart?.chart?.items[Object.keys(ZChart?.RTChart?.chart?.items)[i]]
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
    }, [ZChart])

    return (
        <div className="w-full mt-[110px]">
            <div className="w-full h-full mb-10 flex items-center gap-3 text-[40px] font-bold leading-normal text-white">
                <h3 title="24H" className="zingchart-text cursor-text">
                    #zingchart
                </h3>
                <span className="cursor-pointer hover:opacity-90">
                    <MdPlayCircle size={40} className="text-white" />
                </span>
            </div>
            <div className="w-full h-[300px] mb-[10px] flex justify-center items-center">
                <div className="w-full h-full ">{data && <Line data={data} options={options} />}</div>
            </div>
            <div className="w-full mb-[10px] flex flex-col justify-center items-center">
                <RankList data={ZChart?.RTChart?.items} />
            </div>
            <div className="w-full min-h-[590px] absolute m-[28px_calc(59px_*_-1)]">
                <div className="bg-blur"></div>
                <div className="bg-alpha"></div>
                <div className="absolute top-0 left-0 bottom-0 right-0 pt-10 px-[59px] bg-transparent">
                    <h3 className="w-fit mb-5 text-[40px] capitalize font-extrabold leading-normal cursor-pointer">
                        bảng xếp hạng tuần
                    </h3>
                    <div className="w-full flex gap-7">
                        {ZChart?.weekChart &&
                            Object.entries(ZChart?.weekChart)?.map((item, index) => (
                                <div
                                    key={item}
                                    className="w-1/3 flex flex-col justify-between rounded-2xl bg-[#ffffff0d] p-[20px_10px]"
                                >
                                    <div className="flex items-center gap-2 pb-[10px] pl-10  ">
                                        <h3 className="text-2xl font-bold leading-normal cursor-pointer hover:purple-hover">
                                            {item[0] === 'vn' ? 'Việt Nam' : item[0] === 'us' ? 'US-UK' : 'K-Pop'}
                                        </h3>
                                        <span className="w-7 h-7 bg-white rounded-full cursor-pointer hover:opacity-90 relative">
                                            <MdPlayCircle size={28} color={'#9b4de0'} className="" />
                                        </span>
                                    </div>
                                    <RankList data={item[1]?.items} isWeekChart isHideAlbumTitle />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ZingChart
