import * as httpRequest from '../httpRequest'

export const getHome = async () => {
    try {
        const res = await httpRequest.get('home')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getChartHome = async () => {
    try {
        const res = await httpRequest.get('charthome')
        return res
    } catch (error) {
        console.log(error)
    }
}
