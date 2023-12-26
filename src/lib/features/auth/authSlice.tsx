import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: 0
  },
  reducers: {
    initializeAuth: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    }
  }
})

export const { initializeAuth } = authSlice.actions

const store = configureStore({
  reducer: authSlice.reducer
})

export default authSlice.reducer

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()))