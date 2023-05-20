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

export const apiGetArtistSong = async (singerId) => {
    try {
        const res = await httpRequest.get('artistsong', {
            params: {
                id: singerId,
                page: 1,
                count: 100,
            },
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const apiSearch = async (keyword) => {
    try {
        const res = await httpRequest.get('search', {
            params: {
                keyword,
            },
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const apiGetArtist = async (alias) => {
    try {
        const res = await httpRequest.get('artist', {
            params: {
                name: alias,
            },
        })
        return res
    } catch (error) {
        console.log(error)
    }
}
