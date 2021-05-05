import { SET_DATA, SIGN_OUT, SET_AUTH_ERROR } from '../constants'
import { localStorageGet } from "../../utils/localStorage"

const initialState = {
    token: localStorageGet('token'),
    firstName: localStorageGet('firstName'),
    id: localStorageGet('id'),
    error: ''
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_DATA:
            const { token, name, id } = payload
            return { ...state, token, firstName: name, id }
        case SIGN_OUT:
            return { token: '', firstName: '', id: '', error: '' }
        case SET_AUTH_ERROR:
            //payload is error message, a string
            return { ...state, error: payload }
        default:
            return state
    }
}

export default authReducer
