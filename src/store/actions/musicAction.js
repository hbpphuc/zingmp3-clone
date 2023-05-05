import actionTypes from './actionTypes'
import * as musicApi from '../../apis/musicApi'

export const setCurSongId = (songId) => ({ type: actionTypes.SET_CUR_SONG_ID, songId })
export const setPlaying = (flag) => ({ type: actionTypes.PLAY, flag })
export const vipSong = (flag) => ({ type: actionTypes.VIPSONG, flag })
export const setPlaylist = (listSong) => ({ type: actionTypes.PLAYLIST, listSong })
// export const detailPlaylist = (pid) => async (dispatch) => {
//     try {
//         const res = await musicApi.apiGetDetailPlaylist(pid)
//         if (res?.err === 0) {
//             dispatch({
//                 type: actionTypes.PLAYLIST,
//                 songs: res.data,
//             })
//         }
//     } catch (error) {
//         dispatch({ type: actionTypes.PLAYLIST, songs: null })
//     }
// }
