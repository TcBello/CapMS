import { createSlice } from "@reduxjs/toolkit";

// ADMIN INITIAL STATE
const adminInitialState = {
    uid: "",
    email: "",
    role: "",
}

const adminSlice: any = createSlice({
    name: "admin",
    initialState: {value: adminInitialState},
    reducers: {
        loginAdmin: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { loginAdmin } = adminSlice.actions;

export default adminSlice.reducer;