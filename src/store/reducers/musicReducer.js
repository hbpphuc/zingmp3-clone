import actionTypes from '../actions/actionTypes'

const initState = {
    curSongId: null,
    isPlaying: false,
    isVipSong: false,
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

        default:
            return state
    }
}

export default musicReducer
