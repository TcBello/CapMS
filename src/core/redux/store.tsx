import {configureStore} from "@reduxjs/toolkit";
import admin from "./slices/admin";
import selectStudentSlice from "./slices/select-student-slice";
import userSlice from "./slices/user";


const store = configureStore({
    reducer: {
      user: userSlice,
      admin: admin,
      selectStudent: selectStudentSlice
    },
});

export default store;