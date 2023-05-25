export const formatFollow = (number) => {
    if (number > Math.pow(10, 6)) {
        return `${Math.round((number * 10) / Math.pow(10, 6)) / 10}M`
    } else if (number < 1000) {
        return number
    } else {
        return `${Math.round((number * 10) / Math.pow(10, 3)) / 10}K`
    }
}
