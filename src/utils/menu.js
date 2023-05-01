import icons from '../assets/icons/Icons'

const { MdOutlineLibraryMusic, MdOutlineHomeMax, TbChartDots2 } = icons

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
