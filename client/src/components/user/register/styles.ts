import { Link } from "react-router-dom";
import styled from "styled-components";


export const RegisterInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 14px;
`;

export const RegisterInputField=styled.input.attrs({type:"text"})`
  width: 240px;
  height: 42px;
  border-radius: 8px;
  border: 1px #f0f1f7;
  outline: none;
  ::placeholder {
    padding-left: 5px;
  }

`

export const RegisterInputFieldPassword=styled.input.attrs({type:"password"})`
width: 240px;
height: 42px;
border-radius: 8px;
border: 1px #f0f1f7;
outline: none;
::placeholder {
  padding-left: 5px;
}

`
export const RegisterInputFieldHeader=styled.label`
  color: grey;
  align-self: flex-start;
  margin-bottom: 5px;
  margin-top: 20px;;
`
export const RegisterInputFieldContainer=styled.div`
  display: flex;
  flex-direction: column;
 `

 export const RegisteredLabel=styled(Link)`
  color: grey;
  font-size: 12px;
  cursor: pointer;
  text-decoration: none;
  `

  export const EmailExistsErr=styled.label`
  color: red;
  `