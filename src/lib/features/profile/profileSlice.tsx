import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'

const profileSlice = createSlice({
  name: 'loading',
  initialState: {
    value: false
  },
  reducers: {
    setProfile: (state, action: PayloadAction<any>) => {      
      state.value = action.payload
    }
  }
})

export const { setProfile } = profileSlice.actions

const store = configureStore({
  reducer: profileSlice.reducer
})

export default profileSlice.reducer