import { createSlice } from "@reduxjs/toolkit"; 

// USER INITIAL STATE
const userInitialState = {
    uid: "",
    email: "",
    firstName: "",
    lastName: "",
    photo: "",
    contactNumber: "",
    srCode: "",
    course: "",
    role: "",
};

// USER SLICE
const userSlice: any = createSlice({
    name : "user",
    initialState:  {value : userInitialState},
    reducers: {
        login : (state, action) => {
            state.value =  action.payload;
        },
    },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;