import actionTypes from '../actions/actionTypes'

const initState = {
    curSongId: null,
    isPlaying: false,
    isVipSong: false,
    listSong: [],
    artistSong: [],
    searchData: {},
    keyword: '',
}

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.songId || null,
            }

        case actionTypes.PLAY:
            return {
                ...state,
                isPlaying: action.flag,
            }

        case actionTypes.VIPSONG:
            return {
                ...state,
                isVipSong: action.flag,
            }

        case actionTypes.PLAYLIST:
            return {
                ...state,
                listSong: action.listSong || null,
            }

        case actionTypes.SEARCH:
            return {
                ...state,
                searchData: action.data || {},
                keyword: action.q || '',
            }

        case actionTypes.ARTISTLSONG: {
            return {
                ...state,
                artistSong: action.artistsong || [],
            }
        }

        default:
            return state
    }
}

export default musicReducer
