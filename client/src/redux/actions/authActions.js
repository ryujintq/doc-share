import api from '../../api/api'
import { localStorageRemove, localStorageSet } from '../../utils/localStorage'
import { SET_DATA, SIGN_OUT, SET_AUTH_ERROR } from '../constants'

export const signup = (firstName, lastName, email, password) => async dispatch => {
    try {
        const { data: { data: { token, id, firstName: name } } } = await api.post('/users/signup', { firstName, lastName, email, password })
        storeAndSetData(dispatch, token, id, name)
    } catch (error) {
        dispatch({ type: SET_AUTH_ERROR, payload: error.response.data.message })
    }
}

export const login = (email, password) => async dispatch => {
    try {
        const { data: { data: { token, id, firstName } } } = await api.post('/users/login', { email, password })
        storeAndSetData(dispatch, token, id, firstName)

    } catch (error) {
        dispatch({ type: SET_AUTH_ERROR, payload: error.response.data.message })
    }
}

export const signout = () => dispatch => {
    localStorageRemove('token')
    localStorageRemove('id')
    localStorageRemove('firstName')

    dispatch({ type: SIGN_OUT })
}

const storeAndSetData = (dispatch, token, id, firstName) => {
    localStorageSet('token', token)
    localStorageSet('id', id)
    localStorageSet('firstName', firstName)
    dispatch({ type: SET_DATA, payload: { token, id, name: firstName } })
}