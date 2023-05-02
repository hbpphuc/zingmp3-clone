import actionTypes from './actionTypes'
import * as homeApi from '../../apis/homeApi'

export const setCurSongId = (songId) => ({ type: actionTypes.SET_CUR_SONG_ID, songId })
