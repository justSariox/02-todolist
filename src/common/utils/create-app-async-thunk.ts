import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {TResponse} from '../types'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType,
    dispatch: AppDispatch,
    rejectValue: null | TResponse
}>()