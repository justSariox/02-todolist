import React from 'react'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../../app/store'
import {useActions} from '../../hooks/'
import {appActions} from '../../../app/app-reducer'
import { AlertProps, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref,
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const {setAppErrorAC} = useActions(appActions)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setAppErrorAC({error: null});
    }


    const isOpen = error !== null;

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
					<Alert onClose={handleClose} severity="error">
						{error}
					</Alert>
				</Snackbar>
    )
}
