import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push({ id: Date.now(), ...action.payload });
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    toggleActive: (state, action) => {
      const user = state.users.find((user) => user.id === action.payload);
      if (user) user.active = !user.active;
    },
  },
});

export const { addUser, deleteUser, updateUser, toggleActive } =
  userSlice.actions;
export default userSlice.reducer;
