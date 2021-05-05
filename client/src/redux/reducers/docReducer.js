import { SET_TITLE } from '../constants'

const initialState = {
    title: ''
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_TITLE:
            return { title: payload }
        default:
            return state
    }
}

export default authReducer
