import {applyMiddleware, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import admin from "./slices/admin";
import selectStudentSlice from "./slices/select-student-slice";
import userSlice from "./slices/user";

const store = configureStore({
    reducer: {
      user: userSlice,
      admin: admin,
      selectStudent: selectStudentSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;