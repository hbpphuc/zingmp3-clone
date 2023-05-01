import actionTypes from '../actions/actionTypes'

const initState = {
    home: [],
    test: 'testing...',
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return state

        default:
            return state
    }
}

export default appReducer
