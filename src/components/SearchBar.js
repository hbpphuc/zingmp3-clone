import React, { memo, useEffect, useRef, useState } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'
import Headless from '@tippyjs/react/headless'
import _ from 'lodash'
import icons from './Icons'
import * as musicApi from '../apis/musicApi'
import * as musicAction from '../store/actions'
import * as homeAction from '../store/actions'
import routes from '../utils/routes'

const { TfiSearch, CgClose } = icons

const SearchBar = () => {
    const [keyword, setKeyword] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [isFocus, setIsFocus] = useState(false)
    const formSeachRef = useRef()
    const searchInputRef = useRef()

    const dispatch = useDispatch()
    const { searchData } = useSelector((state) => state.music)
    const navigate = useNavigate()

    // const [debouncedValue] = useDebounce(keyword, 700)
    // useEffect(() => {
    //     dispatch(musicAction.search(debouncedValue))
    // }, [debouncedValue])

    const handleEnterSearch = async (e) => {
        if (e.keyCode === 13) {
            if (keyword === '' || keyword.startsWith(' ')) {
                e.preventDefault()
            } else {
                dispatch(homeAction.loading(true))
                dispatch(musicAction.search(keyword))
                dispatch(homeAction.loading(false))
                if (!_.isEmpty(await searchData)) {
                    navigate({
                        pathname: `${routes.SEARCH}/${routes.SEARCH_ALL}`,
                        search: createSearchParams({
                            q: keyword,
                        }).toString(),
                    })
                    setIsFocus(false)
                    searchInputRef.current.blur()
                } else {
                    e.preventDefault()
                }
            }
        }
    }

    const renderSearchResult = (attrs) => (
        <div
            className="w-[440px] h-[200px] p-[13px_10px] bg-[#34224f] rounded-[0px_0px_20px_20px] shadow-[0_4px_6px_0_rgba(32,33,36,.28)] overflow-hidden"
            tabIndex="-1"
            {...attrs}
        >
            <h4>Đề xuất cho bạn</h4>
        </div>
    )

    return (
        <div className="w-full h-10">
            <Headless
                interactive
                visible={isFocus}
                render={renderSearchResult}
                offset={[0, 0]}
                onClickOutside={() => setIsFocus(false)}
            >
                <div
                    ref={formSeachRef}
                    className={`w-full h-10 px-[10px] flex items-center gap-2 z-10 ${
                        isFocus
                            ? 'rounded-[20px_20px_0_0] shadow-[0_1px_5px_0_rgba(0, 0, 0, 0.2)] bg-[#34224f] border border-transparent'
                            : 'bg-[#ffffff1a] rounded-full'
                    }`}
                >
                    <button className="w-5 h-full flex items-center outline-none bg-transparent">
                        <TfiSearch size={20} />
                    </button>
                    <input
                        ref={searchInputRef}
                        type={'text'}
                        placeholder={'Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'}
                        className="w-full h-10 outline-none bg-transparent text-[#eee] text-sm font-normal placeholder:text-[#c5c5c5]"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onFocus={() => setIsFocus(true)}
                        onKeyUp={handleEnterSearch}
                    />
                    {keyword && (
                        <span
                            onClick={() => {
                                setKeyword('')
                                setIsFocus(true)
                                searchInputRef.current.focus()
                            }}
                            className="text-[#c5c5c5] cursor-pointer"
                        >
                            <CgClose />
                        </span>
                    )}
                </div>
            </Headless>
        </div>
    )
}

export default memo(SearchBar)
