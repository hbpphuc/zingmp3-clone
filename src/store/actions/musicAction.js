import actionTypes from './actionTypes'
import * as musicApi from '../../apis/musicApi'

export const setPlaylist = (listSong) => ({ type: actionTypes.PLAYLIST, listSong })
export const setCurSongId = (songId) => ({ type: actionTypes.SET_CUR_SONG_ID, songId })
export const setPlaying = (flag) => ({ type: actionTypes.PLAY, flag })
export const vipSong = (flag) => ({ type: actionTypes.VIPSONG, flag })
export const loading = (flag) => ({ type: actionTypes.LOADING, flag })

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
                })
            } else {
                dispatch({
                    type: actionTypes.SEARCH,
                    data: null,
                })
            }
        } else {
            dispatch({ type: actionTypes.SEARCH, data: null })
        }
    } catch (error) {
        dispatch({ type: actionTypes.SEARCH, data: null })
    }
}
