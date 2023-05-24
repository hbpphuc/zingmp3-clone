import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import appReducer from './appReducer'
import musicReducer from './musicReducer'

const commonConfig = { storage, stateReconciler: autoMergeLevel2 }

const appConfig = { ...commonConfig, key: 'APP', whitelist: ['isPLayingBar'] }
const musicConfig = {
    ...commonConfig,
    key: 'MUSIC',
    whitelist: ['curSongId', 'curSongData', 'curAlbumId', 'recentSongs'],
}

const rootReducer = combineReducers({
    app: persistReducer(appConfig, appReducer),
    music: persistReducer(musicConfig, musicReducer),
})
export default rootReducer
