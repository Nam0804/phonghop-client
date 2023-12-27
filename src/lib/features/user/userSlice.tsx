import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: 0
  },
  reducers: {
    initializeUser: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    }
  }
})

export const { initializeUser } = userSlice.actions

const store = configureStore({
  reducer: userSlice.reducer
})

export default userSlice.reducer

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()))