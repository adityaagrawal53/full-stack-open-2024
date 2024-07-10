import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
      showNotif(state, action) {
          return action.payload
      },
      resetNotif() {
          return ''
      }
  }
})


export const setNotif = (msg, time=5) => {
  return dispatch => {
      dispatch(showNotif(msg))
      setTimeout(() => {
          dispatch(resetNotif())
      }, 1000 * time) 
  }
}

export const { showNotif, resetNotif } = notificationSlice.actions
export default notificationSlice.reducer