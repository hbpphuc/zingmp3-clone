import * as httpRequest from '../httpRequest'

export const getHome = async () => {
    try {
        const res = await httpRequest.get('home')
        return res
    } catch (error) {
        console.log(error)
    }
}
