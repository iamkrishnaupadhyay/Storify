import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice.js";

const appStore = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default appStore;