import styled from "styled-components";
import { IButtonProps } from "./types";


export const Button=styled.button<IButtonProps>`

width: ${props=>props.width};
height: ${props=>props.height};
background-color: ${props=>props.backgroundColor};
border: none;
border-radius: 8px;
color: #fff;
cursor: pointer;
`

