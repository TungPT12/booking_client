import { createSlice } from "@reduxjs/toolkit";

const initAuthn = {
    isAuthn: false
}

const authnSlice = createSlice({
    name: "Authentication",
    initialState: initAuthn,
    reducers: {
        login(state, payload) {
            const user = payload.payload;
            localStorage.setItem('bookingToken', user.token);
            state.token = user.token;
            state.isAuthn = true;
            state._id = user._id;
            state.email = user.email;
            state.fullName = user.fullName;
            state.isAdmin = user.isAdmin;
            state.phoneNumber = user.phoneNumber;
            state.username = user.username;
            state.avatar = user.avatar;
        },
        logout(state) {
            localStorage.removeItem('bookingToken');
            state.isAuthn = false;
        },
        setUser(state, payload) {
            const user = payload.payload;
            state.token = localStorage.getItem('bookingToken');
            state.isAuthn = true;
            state._id = user._id;
            state.email = user.email;
            state.fullName = user.fullName;
            state.isAdmin = user.isAdmin;
            state.phoneNumber = user.phoneNumber;
            state.username = user.username;
            state.avatar = user.avatar;
        }
    }
})

const authnReducer = authnSlice.reducer;
const authnAction = authnSlice.actions;

export default authnReducer;

export {
    authnAction
}