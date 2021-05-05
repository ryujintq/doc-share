import { SET_TITLE } from "../constants"

export const setTitle = title => dispatch => {
    dispatch({ type: SET_TITLE, payload: title })
}