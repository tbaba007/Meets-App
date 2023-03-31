import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppColors } from "../../helper/common";
import { ISideBarProps } from "./types";



export const Container=styled.div`
 background-color:#363740;
 width: 200px;
 height: 100vh;
 border-right-color: #fff;
 border-top: none;
 border-width: 0.1px;
 border-style: solid;
 position: fixed;
    background-size:900vw auto;
     background-color: #111; /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
     z-index: 2; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
`

export const ItemContainer=styled.div`
 display: flex;
 flex-direction: row;
 gap:-10px;
 color: ${AppColors[2].value};
 padding-top: 30px;

`
export const ItemIcon=styled.div<ISideBarProps>`
 background-image: url(${props=>props.icon});
 background-repeat: no-repeat;
 width: 30px;
 margin-left: 30px;
 margin-top: 4px;
 position: absolute;
 height: 10px;
`

export const ItemText=styled.div`
color: #fff;
font-size: 14px;
margin-left: 60px;
text-align: start;
padding-right: 40px;
 cursor: pointer;

`

export const Avartar=styled.div`
width: 100px;
height: 100px;
border-radius: 50%;
background-size: contain;
background-image: url('/assets/images/img_avatar.png');
background-repeat: no-repeat;
margin-left: 32px;
margin-top: 10px;
`
export const SubMenuIcon=styled.label`
color: #fff;
`

export const SubMenuList=styled(Link)`
color: #fff;
list-style: none;
text-align: left;
text-decoration: none;
cursor: pointer;
margin-top: 5px;
font-size: 12px;
`

export const SubMenuContainer=styled.div`
display: flex;
margin-top: 5px;
justify-content: flex-start;
margin-left: 60px;
`