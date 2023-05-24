import actionTypes from './actionTypes'
import * as musicApi from '../../apis/musicApi'

export const setPlaylist = (listSong) => ({ type: actionTypes.PLAYLIST, listSong })

export const setCurSongId = (songId) => ({ type: actionTypes.SET_CUR_SONG_ID, songId })

export const setPlaying = (flag) => ({ type: actionTypes.PLAY, flag })

export const vipSong = (flag) => ({ type: actionTypes.VIPSONG, flag })

export const loading = (flag) => ({ type: actionTypes.LOADING, flag })

export const setCurSongData = (data) => ({ type: actionTypes.SET_CUR_SONG_DATA, data })

export const setCurAlbumId = (pid) => ({ type: actionTypes.SET_CUR_ALBUM_DATA, pid })

export const setRecentSongs = (data) => ({ type: actionTypes.SET_RECENT, data })

export const search = (keyword) => async (dispatch) => {
    try {
        const res = await musicApi.apiSearch(keyword)
        if (res?.err === 0) {
            if (
                res.data.counter.artist ||
                res.data.counter.playlist ||
                res.data.counter.song ||
                res.data.counter.video
            ) {
                dispatch({
                    type: actionTypes.SEARCH,
                    data: res.data,
                    q: keyword,
                })
            } else {
                dispatch({
                    type: actionTypes.SEARCH,
                    data: null,
                    q: keyword,
                })
            }
        } else {
            dispatch({ type: actionTypes.SEARCH, data: null, q: keyword })
        }
    } catch (error) {
        dispatch({ type: actionTypes.SEARCH, data: null, q: keyword })
    }
}

export const getArtistSong = (singerId) => async (dispatch) => {
    try {
        const res = await musicApi.apiGetArtistSong(singerId)
        if (res?.err === 0) {
            dispatch({
                type: actionTypes.ARTISTLSONG,
                artistsong: res.data,
            })
        } else {
            dispatch({ type: actionTypes.ARTISTLSONG, artistsong: null })
        }
    } catch (error) {
        dispatch({ type: actionTypes.ARTISTLSONG, artistsong: null })
    }
}
