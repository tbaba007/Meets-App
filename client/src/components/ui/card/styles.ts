import styled from "styled-components";
import { ICardProps } from "./types";

export const Container = styled.div<ICardProps>`
  background-color: #dfe0eb;
  margin-top: 50px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 8px;
`;
