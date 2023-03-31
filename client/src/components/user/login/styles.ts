import styled from "styled-components";

export const Container = styled.div`
  background-color: #363740;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const LoginInputEmail = styled.input.attrs({ type: "email" })`
  width: 316px;
  width: 290px;
  margin-right: 30px;
  height: 42px;
  border-radius: 8px;
  border: 1px #f0f1f7;
  outline: none;
  ::placeholder {
    padding-left: 5px;
  }
`;
export const LoginInputPassword = styled.input.attrs({ type: "password" })`
  width: 290px;
  height: 42px;
  border-radius: 8px;
  border: 1px #f0f1f7;
  outline: none;
  ::placeholder {
    padding-left: 5px;
  }
`;
export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
`;

export const LoginInputHeader = styled.label`
  color: grey;
  align-self: flex-start;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export const LoginInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-left: 30px;
`;

export const RegisterLink = styled.div`
  cursor: pointer;
  align-self: center;
  color: grey;
  font-size: 14px;
`;

