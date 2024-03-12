import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


export const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
            return {
                ...state,
                ...action.payload
            }
        },
        logout: (_state) => {
            localStorage.removeItem('userInfo')
            return null
        },
        verify: (state, action) => {
            if (state) {
                const newUser = {
                    ...state,
                    emailVerified: action.payload,
                };
                localStorage.setItem('userInfo', JSON.stringify(newUser));
                return newUser;
            }
            return state; // Return the original state if no user is found
        },
        updateInfo: (state, action) => {
            if (state) {
                const newUser = {
                    ...state,
                    ...action.payload,
                };
                localStorage.setItem('userInfo', JSON.stringify(newUser));
                return newUser;
            }
            return state;
        }
    }
})

export default userSlice.reducer
export const { setCredentials, logout, verify, updateInfo } = userSlice.actions