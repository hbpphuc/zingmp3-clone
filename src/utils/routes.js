const routes = {
    PUBLIC: '/*',
    HOME: '',
    LOGIN: 'login',
    MY_MUSIC: 'mymusic',
    TOP_100: 'top100',
    ALBUM_TITLE_ID: 'album/:title/:pid',
    PLAYLIST_TITLE_ID: 'playlist/:title/:pid',
    WEEKCHART_TITLE_ID: 'zing-chart-tuan/:title/:pid',
    ZING_CHART: 'zing-chart',
    SEARCH: 'tim-kiem',
    SEARCH_ALL: 'tat-ca',
    SEARCH_SONG: 'bai-hat',
    SINGER: ':singer',
    ARTIST_SINGER: 'nghe-si/:singer',
}

export default routes
