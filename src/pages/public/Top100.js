import React, { memo, useEffect, useState } from 'react'
import * as musicApi from '../../apis/musicApi'
import * as homeAction from '../../store/actions'
import { Top100Banner } from '../../components/Images'
import { Loading, Playlist } from '../../components'
import { useDispatch, useSelector } from 'react-redux'

const Top100 = () => {
    const [topList, setTopList] = useState(null)
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.app)

    useEffect(() => {
        const fetchTop100 = async () => {
            dispatch(homeAction.loading(true))
            const result = await musicApi.apiGetTop100()
            setTopList(result.data)
            dispatch(homeAction.loading(false))
        }
        fetchTop100()
    }, [])

    return (
        <div className="w-full h-[1000px]">
            {isLoading && (
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#170f23] z-10">
                    <div className="w-creen h-screen flex justify-center items-center ">
                        <Loading />
                    </div>
                </div>
            )}
            {topList && (
                <div>
                    <div className="w-full mt-[90px] mb-[30px] flex justify-center items-center">
                        <Top100Banner />
                    </div>
                    <div className="w-full">
                        {topList?.map((item) => (
                            <Playlist key={item?.genre?.name} data={item} top100 viewType={item.viewType} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(Top100)
