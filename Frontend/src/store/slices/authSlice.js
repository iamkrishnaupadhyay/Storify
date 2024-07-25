import { createSlice } from '@reduxjs/toolkit';


const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthorized: localStorage.getItem("userInfo") ? true : false,
        email: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).data.email : null,
        name: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).data.name : null,
        token: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).token : null,
        isEmailVerified: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).data.isEmailVerified : null,
    },
    reducers: {
        appLogin: (state, action) => {
            console.log(action);
            const { payload } = action;
            const { data } = payload;
            const { token } = payload;
            state.email = data.email;
            state.name = data.name;
            state.token = token;
            state.isAuthorized = true;
            state.isEmailVerified = data.isEmailVerified;
            localStorage.setItem("userInfo", JSON.stringify(payload));
        },
        appLogout: (state) => {
            state.isAuthorized = false;
            state.email = null;
            state.name = null;
            state.token = null;
            state.isEmailVerified = false;
            localStorage.removeItem("userInfo");
        },
        emailVerified: (state) => {
            state.isEmailVerified = true;
            localStorage.setItem(
                "userInfo",
                JSON.stringify({
                    data: {
                        email: state.email,
                        name: state.name,
                        isEmailVerified: state.isEmailVerified,
                        _id: state.userId,
                    },
                    token: state.token,
                })
            );
        },
    }
});

export const { appLogin, appLogout, emailVerified } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;

