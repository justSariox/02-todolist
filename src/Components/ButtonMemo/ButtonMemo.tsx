import React, {FC, memo} from "react";
import {Button} from "@mui/material";

type ButtonPropsType = {
    title: string
    callBack: () => void
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    variant: 'text' | 'outlined' | 'contained'
}

export const ButtonMemo: FC<ButtonPropsType> = memo(({variant, color, callBack, title}) => {
    return (
        <Button variant={variant}
                    onClick={callBack}
                    color={color}>{title}
        </Button>
    )
})