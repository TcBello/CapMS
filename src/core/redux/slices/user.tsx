import { createSlice } from "@reduxjs/toolkit"; 
import UserModel, { setUserModel } from "../../models/user_model";

// USER INITIAL STATE
const userInitialState: UserModel = setUserModel({});

// USER SLICE
const userSlice: any = createSlice({
    name : "user",
    initialState:  {value: userInitialState},
    reducers: {
        login : (state, action) => {
            state.value =  action.payload;
        },
    },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;