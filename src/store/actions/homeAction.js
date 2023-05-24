import actionTypes from './actionTypes'
import * as homeApi from '../../apis/homeApi'

export const getHome = () => async (dispatch) => {
    try {
        const res = await homeApi.getHome()
        if (res?.err === 0) {
            dispatch({
                type: actionTypes.GET_HOME,
                homeData: res.data.items,
            })
        } else {
            dispatch({
                type: actionTypes.GET_HOME,
                homeData: null,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_HOME,
            homeData: null,
        })
    }
}

export const togglePlayingBar = (flag) => ({ type: actionTypes.PLAYING_BAR, flag })
