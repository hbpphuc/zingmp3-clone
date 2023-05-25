import React, { memo, useEffect, useState } from 'react'
import * as musicApi from '../../apis/musicApi'
import { Top100Banner } from '../../components/Images'
import { Playlist } from '../../components'

const Top100 = () => {
    const [topList, setTopList] = useState(null)

    useEffect(() => {
        const fetchTop100 = async () => {
            const result = await musicApi.apiGetTop100()
            setTopList(result.data)
        }
        fetchTop100()
    }, [])

    return (
        <div className="w-full h-[1000px]">
            <div className="w-full mt-[90px] mb-[30px] flex justify-center items-center">
                <Top100Banner />
            </div>
            <div className="w-full">
                {topList?.map((item) => (
                    <Playlist key={item?.genre?.name} data={item} top100 viewType={item.viewType} />
                ))}
            </div>
        </div>
    )
}

export default memo(Top100)
