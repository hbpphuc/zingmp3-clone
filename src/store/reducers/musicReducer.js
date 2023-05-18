import actionTypes from '../actions/actionTypes'

const initState = {
    curSongId: null,
    isPlaying: false,
    isVipSong: false,
    listSong: [],
    searchData: {},
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
            }

        default:
            return state
    }
}

export default musicReducer
