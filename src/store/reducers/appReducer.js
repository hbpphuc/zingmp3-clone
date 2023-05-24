import actionTypes from '../actions/actionTypes'

const initState = {
    banner: [],
    newRelease: {},
    hEditorTheme: {},
    hEditorTheme2: {},
    hArtistTheme: {},
    h100: {},
    hAlbum: {},
    hZCRank: [],
    hZChart: {},
    weekChart: [],
    isLoading: false,
    isPLayingBar: false,
    currentWidth: null,
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find((item) => item.sectionId === 'hSlider')?.items || null,
                newRelease: action.homeData?.find((item) => item.sectionType === 'new-release') || {},
                hEditorTheme: action.homeData?.find((item) => item.sectionId === 'hEditorTheme') || {},
                hEditorTheme2: action.homeData?.find((item) => item.sectionId === 'hEditorTheme2') || {},
                hArtistTheme: action.homeData?.find((item) => item.sectionId === 'hArtistTheme') || {},
                hZCRank: action.homeData?.find((item) => item.sectionId === 'hZC')?.items || [],
                hZChart: action.homeData?.find((item) => item.sectionId === 'hZC')?.chart || {},
                weekChart: action.homeData?.find((item) => item.sectionType === 'weekChart')?.items || [],
                h100: action.homeData?.find((item) => item.sectionId === 'h100') || {},
                hAlbum: action.homeData?.find((item) => item.sectionId === 'hAlbum') || {},
            }
        case actionTypes.LOADING:
            return {
                ...state,
                isLoading: action.flag,
            }

        case actionTypes.PLAYING_BAR:
            return {
                ...state,
                isPLayingBar: action.flag,
            }

        case actionTypes.CURRENT_WIDTH:
            return {
                ...state,
                currentWidth: action.width,
            }

        default:
            return state
    }
}

export default appReducer
