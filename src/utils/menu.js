import { Icons } from '../components'

const { MdOutlineLibraryMusic, MdOutlineHomeMax, TbChartDots2 } = Icons

export const sidebarMenu = [
    {
        path: '',
        text: 'Khám Phá',
        icon: <MdOutlineHomeMax size={24} />,
    },
    {
        path: 'zing-chart',
        text: '#zingchart',
        icon: <TbChartDots2 size={24} />,
    },
    {
        path: 'mymusic',
        text: 'Thư Viện',
        icon: <MdOutlineLibraryMusic size={24} />,
    },
]

export const searchMenu = [
    {
        path: 'tat-ca',
        text: 'tất cả',
    },
    {
        path: 'bai-hat',
        text: 'bài hát',
    },
    {
        path: 'playlist',
        text: 'playlist/album',
    },
    {
        path: 'artist',
        text: 'nghệ sĩ/oa',
    },
    {
        path: 'video',
        text: 'mv',
    },
]
