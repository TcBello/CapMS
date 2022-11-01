import {configureStore} from "@reduxjs/toolkit";
import admin from "./slices/admin";
import userSlice from "./slices/user";


const store = configureStore({
    reducer: {
      user: userSlice,
      admin: admin
    },
});

export default store;