import React from 'react'
import icons from '../assets/icons/Icons'

const { TfiSearch } = icons

const Search = () => {
    return (
        <form className="w-full h-10 px-[10px] flex items-center bg-[#ffffff1a] gap-2 rounded-full ">
            <button className="w-5 h-full flex items-center outline-none bg-transparent">
                <TfiSearch size={20} />
            </button>
            <input
                type={'text'}
                placeholder={'Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'}
                className="w-full h-10 outline-none bg-transparent text-[#eee] text-sm font-normal placeholder:text-[#c5c5c5]"
            />
        </form>
    )
}

export default Search
