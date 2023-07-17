import { AppDispatch, AppRootStateType } from '../../app/store';
import { handleServerNetworkError } from '../../common/utils/handle-server-network-error';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { appActions } from '../../app/app-reducer';
import { TResponse } from '../../common/types';

export const thunkTryCatch = async (
    thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatch, null | TResponse>,
    logic: Function) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatusAC({status: 'loading'}))
    try {
        return await logic()
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setAppStatusAC({status: 'idle'}))
    }
}
