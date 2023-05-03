import * as httpRequest from '../httpRequest'

export const apiGetSong = async (songId) => {
    try {
        const res = await httpRequest.get('song', {
            params: {
                id: songId,
            },
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const apiGetInfoSong = async (songId) => {
    try {
        const res = await httpRequest.get('infosong', {
            params: {
                id: songId,
            },
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const apiGetDetailPlaylist = async (playlistId) => {
    try {
        const res = await httpRequest.get('detailplaylist', {
            params: {
                id: playlistId,
            },
        })
        return res
    } catch (error) {
        console.log(error)
    }
}
