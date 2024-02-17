import { createSlice } from "@reduxjs/toolkit";

interface AuthInterface {
    userAuthenticated : boolean,
    userProfile : {
        avatar? : string | null,
        email? : string | null,
        role? : string | null,
        name? : string | null,
    }

}

const initialState: AuthInterface =  {
    userAuthenticated : false,
    userProfile : {
        avatar : null,
        email : null,
        role : null,
    }

}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        isUserAuthenticated: (state, { payload }) => {
            state.userAuthenticated = payload;
        },
        userProfileAction: (state, { payload }) => {
            state.userProfile = payload;
        },
        resetAuthStateAction: (state) => {
            Object.assign(state, initialState);
        },
    }
})

export const {
    isUserAuthenticated,
    userProfileAction,
    resetAuthStateAction,
} = authSlice.actions;

// export const { actions, reducer } = authSlice;

export const authSelector = (state : any) => state.auth;

export default authSlice.reducer;