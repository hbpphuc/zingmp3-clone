import actionTypes from '../actions/actionTypes'

const initState = {
    curSongId: null,
    curSongData: null,
    isPlaying: false,
    isVipSong: false,
    listSong: [],
    artistSong: [],
    searchData: {},
    keyword: '',
    curAlbumId: null,
    recentSongs: [],
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

        case actionTypes.SET_CUR_SONG_DATA: {
            return {
                ...state,
                curSongData: action.data || null,
            }
        }

        case actionTypes.SET_CUR_ALBUM_DATA: {
            return {
                ...state,
                curAlbumId: action.pid || null,
            }
        }

        case actionTypes.SET_RECENT: {
            let recSongs = state.recentSongs
            if (action.data) {
                if (action.data?.data?.encodeId === state.curSongId) {
                    recSongs = recSongs.filter((i) => i?.data?.encodeId !== state.curSongId)
                }
                recSongs = [action.data, ...recSongs]
            }
            return {
                ...state,
                recentSongs: recSongs,
            }
        }

        default:
            return state
    }
}

export default musicReducer
