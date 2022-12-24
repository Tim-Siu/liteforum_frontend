import {configureStore} from '@reduxjs/toolkit'

const initialState = {
    token : localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    user_id: localStorage.getItem('user_id'),
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                token: action.token,
                username: action.username,
                user_id: action.user_id,
            }
        case 'LOGOUT':
            return {
                ...state,
                token: null,
                username: null,
                user_id: null,
            }
        default:
            return state
    }
}

const store = configureStore({
    reducer,
})
export default store;