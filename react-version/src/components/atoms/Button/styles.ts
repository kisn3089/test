import styled from "styled-components";
import { IStyledButton } from "./type";

export const StyledButton = styled.button<IStyledButton>`
  display: flex;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) =>
    props.style?.borderRadius ? props.style?.borderRadius : "60px"};
  align-items: center;
  outline: none;
  border: none;
  background-color: ${(props) =>
    props.style?.backgroundColor
      ? props.style?.backgroundColor
      : props.theme.white};
  background-image: ${(props) =>
    props.backgroundImage ? `url("${props.backgroundImage}")` : ""};
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${(props) => props.style?.width};
  color: ${(props) =>
    props.style?.color ? props.style?.color : props.theme.white};
  width: ${(props) => props.style?.width};
  height: ${(props) => props.style?.height};
  min-width: ${(props) =>
    props.style?.minWidth ? props.style?.minWidth : "0"};
  min-height: ${(props) =>
    props.style?.minHeight ? props.style?.minHeight : "0"};
  font-size: ${(props) =>
    props.style?.fontSize ? props.style?.fontSize : "0.813rem"};
  font-weight: ${(props) =>
    props.style?.fontWeight ? props.style?.fontWeight : "700"};
  /* padding: ${(props) => (props.padding ? props.padding : "2.5px 0 0 0")}; */
  &:disabled {
    background-color: "#DDD";
    color: "#fff";
    /* opacity: 0.3; */
  }

  &.modal {
    background-color: ${({ theme }) => theme.blue};
    &.disabled {
      background-color: "#DDD";
    }
    /* &:disabled {
      opacity: 1;
      background-color: ${({ theme }) => theme.dp04};
    } */
    &:hover,
    &:focus {
      border: none;
    }
  }
  &.select {
    background-position: right;
  }

  &[type="search"] {
    display: none;
  }

  &[type="disabled"] {
    visibility: hidden;
  }
`;
