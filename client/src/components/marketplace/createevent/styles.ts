import styled from "styled-components";

export const EventContainer=styled.div`
display: flex;
 width: 100%;
 flex-direction: row;
 justify-content: center;
`
export const EventFieldsContainer=styled.div`
 display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px;
`

export const EventInputField=styled.input.attrs({type:"text"})`
  width: 265px;
  height: 42px;
  border-radius: 8px;
  border: 1px #f0f1f7;
  outline: none;
  ::placeholder {
    padding-left: 5px;
  }
`

export const EventSelectField=styled.select`
  width: 265px;
  height: 42px;
  border-radius: 8px;
  border: 1px #f0f1f7;
  outline: none;
  ::placeholder {
    padding-left: 5px;
  }
`

export const EventDescriptionField=styled.textarea`
  width: 265px;
  height: 72px;
  resize: none;
  border-radius: 8px;
  border: 1px #f0f1f7;
  outline: none;
  ::placeholder {
    padding-left: 5px;
  }
`

export const Container=styled.div`
display: flex;
flex-direction: row;
`

export const BtnAddContainer=styled.div`
width:50px;
margin-left: 100px;
margin-top: 5px;
cursor: pointer;
`
export const DisplayList=styled.div`
text-decoration: none;
text-align: left;
list-style: none;
height: 50px;
overflow: scroll;
display: flex;
flex-direction: column;
margin-left: 30px;
margin-top: 10px;

p{
  margin-top: 5px;
}
section{
  display: flex;
  flex-direction: row;
}
`

export const EventDate=styled.input.attrs({type:'date'})`
  width: 265px;
  height: 42px;
  border-radius: 8px;
  border: 1px #f0f1f7;
  outline: none;
  ::placeholder {
    padding-left: 5px;
  }
`


export const EventTime=styled.input.attrs({type:'time'})`
  width: 265px;
  height: 42px;
  border-radius: 8px;
  border: 1px #f0f1f7;
  outline: none;
  ::placeholder {
    padding-left: 5px;
  }
`