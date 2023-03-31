import React from "react";
import { Button } from "./styles";
import { IButtonProps } from "./types";

const ButtonUi = ({
    children,
    backgroundColor,
    height,
    onClick,
    width,
    isDisabled,
}: IButtonProps) => {
    return (
        <Button
            backgroundColor={backgroundColor}
            height={height}
            width={width}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default ButtonUi;
