import {Dispatch} from 'redux'
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "../../app/app-reducer";
import {clearTasksAndTodos} from "../../common/actions/";
import {handleServerAppError, handleServerNetworkError} from "../../common/utils";
import {authAPI, LoginParamsType} from "./auth-api";
import {ResultCode} from '../../common/enums';

const initialState = {
    isLoggedIn: false,
    isInitialize: false,
    captchaPic: ''
}


const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginTC.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(logoutTC.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(initializeAppTC.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })


    }
})


// thunks

const loginTC = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>
('auth/login',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setAppStatusAC({status: 'loading'}))
            const res = await authAPI.login(arg)
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
                return {isLoggedIn: true}
            } else {
                const isShowAppError = !res.data.fieldsErrors.length
                handleServerAppError(res.data, dispatch, isShowAppError)
                return rejectWithValue(res.data)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })


const logoutTC = createAppAsyncThunk<{ isLoggedIn: boolean }, void>
('auth/logout',
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setAppStatusAC({status: 'loading'}))
            const res = await authAPI.logout()
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(clearTasksAndTodos({}, []))
                dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
                return {isLoggedIn: false}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })
const initializeAppTC = createAppAsyncThunk<{ isLoggedIn: boolean }>(
    'auth/initializeApp',
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            dispatch(appActions.setAppStatusAC({status: 'loading'}))
            const res = await authAPI.me();
            if (res.data.resultCode === ResultCode.Success) {
                return {isLoggedIn: true};
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setAppInitializedAC({isInitialized: true}));
        }
    }
);


// export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
//     dispatch(appActions.setAppStatusAC({status: 'loading'}))
//     authAPI.login(data)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(authActions.setIsLoggedInAC({isLoggedIn: true}))
//                 dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
// export const logoutTC = () => (dispatch: Dispatch) => {
//     dispatch(appActions.setAppStatusAC({status: 'loading'}))
//     authAPI.logout()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(authActions.setIsLoggedInAC({isLoggedIn: false}))
//                 dispatch(clearTasksAndTodos({}, []))
//                 dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }


export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {loginTC, logoutTC, initializeAppTC}