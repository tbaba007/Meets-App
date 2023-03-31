import styled from "styled-components";

export const HeaderProfileDropDown = styled.div`
    position: absolute;
    display: none;
    margin-right: 30px;
    width: 100px;
    right: 0;
    padding: 20px;
    background-color: #dfe0eb;
    cursor: pointer;
`;

export const HeaderText = styled.label`
    color: green;
    padding-right: 15px;
    cursor: pointer;
    &:hover ${HeaderProfileDropDown} {
            display: block;
    }
`;
export const HeaderContainer = styled.div`
    display: flex;
    position: absolute;
    justify-content: flex-end;
    width: 100%;
    margin-top: 5px;
    margin-bottom: 30px;
   
`;
