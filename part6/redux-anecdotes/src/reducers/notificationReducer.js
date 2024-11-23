import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        newNotification(state, action) {
            return action.payload
        },
        resetNotification() {
            return initialState
        }
    }
})

export const { newNotification, resetNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
    return dispatch => {
        dispatch(newNotification(content))
        setTimeout(() => {
            dispatch(resetNotification())
        }, time * 1000);
    }
}

export default notificationSlice.reducer