import {TResponse} from '../types'
import {Dispatch} from "redux";
import {appActions} from "../../app/app-reducer";

/**
 *
 * @param data
 * @param dispatch
 * @param showError
 */

export const handleServerAppError = <D>(data: TResponse<D>, dispatch: Dispatch, showError: boolean = true) => {
    if (showError) {
        dispatch(appActions.setAppErrorAC({error: data.messages.length ? data.messages[0] : 'Some error occuerd'}))
    }


    dispatch(appActions.setAppStatusAC({status: 'failed'}))
}