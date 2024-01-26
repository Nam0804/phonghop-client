import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const roomSlice = createSlice({
    name: 'room',
    initialState : {
        selectedRoom: null
      },
    reducers: {
        setSelectedRoom: (state, action: PayloadAction<any>) => {
            state.selectedRoom = action.payload;
        },
    },
});

export const { setSelectedRoom } = roomSlice.actions;
export default roomSlice.reducer;
