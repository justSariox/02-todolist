import {Dispatch} from 'redux'
import {authActions} from '../features/Login/auth-reducer'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../features/Login/auth-api";



const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC: ((state, action: PayloadAction<{error: string | null}>) => {
            state.error = action.payload.error
        }),
        setAppStatusAC: ((state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        }),
        setAppInitializedAC: ((state, action: PayloadAction<{isInitialized: boolean}>) => {
            state.isInitialized = action.payload.isInitialized
        })
    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions



export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedInAC({isLoggedIn: true}));
        } else {

        }

        dispatch(appActions.setAppInitializedAC({isInitialized: true}));
    })
}
