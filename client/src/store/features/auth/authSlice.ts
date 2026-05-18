import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    token: null,
    user: {
        username: "",
        email: "",
        profileImageUrl: "",
        dob: "",
        role: "User",
        following: 0,
        followers: 0
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user.username = action.payload.user.username;
            state.user.email = action.payload.user.email;

            localStorage.setItem('token', JSON.stringify(state.token));
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        logout: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            return initialState;
        }
    }
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;