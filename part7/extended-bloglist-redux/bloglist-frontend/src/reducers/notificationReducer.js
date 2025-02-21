import { createSlice } from "@reduxjs/toolkit"

const initialState = ""

const notificationSlice = createSlice({
  name: "notification", 
  initialState,
  reducers: {
    setNotificationState(state, action) {
      return action.payload
    },
    resetNotificationState() {
      return initialState
    }
  }
})

export const { setNotificationState, resetNotificationState } = notificationSlice.actions

export const setNotification = (content, time) => {
  return dispatch => {
    dispatch(setNotificationState(content))
    setTimeout(() => {
      dispatch(resetNotificationState())
    }, time * 1000);
  }
}

export default notificationSlice.reducer
