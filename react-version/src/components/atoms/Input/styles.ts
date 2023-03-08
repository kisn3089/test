import styled from "styled-components";
import { IStyledInput } from "./type";
import searchIcon from "./../../../assets/icons/ic-search1.svg";
import cancelIcon from "./../../../assets/icons/btn-inputdelete.svg";

export const StyledInput = styled.input<IStyledInput>`
  display: flex;
  align-items: center;
  justify-content: start;
  border-radius: ${(props) =>
    props.style?.borderRadius ? props.style?.borderRadius : "0"};
  background-color: ${(props) =>
    props.style?.backgroundColor
      ? props.style?.backgroundColor
      : props.theme.dp00};
  border: ${(props) => (props.border ? props.border : 0)};
  width: ${(props) => (props.style?.width ? props.style?.width : "270px")};
  height: ${(props) => (props.style?.height ? props.style?.height : "40px")};
  margin: "0 0 0 0";
  padding: ${(props) => (props.style?.padding ? props.style?.padding : "0")};
  font-size: ${(props) =>
    props.style?.fontSize ? props.style?.fontSize : "16px"};
  color: ${(props) =>
    props.style?.color ? props.style?.color : props.theme.white};
  transition: 0.3s;
  box-sizing: border-box;
  &::placeholder {
    font-size: ${(props) =>
      props.style?.fontSize ? props.style?.fontSize : "14px"};
    color: #000;
    opacity: 0.3;
  }
  &:focus {
    outline: none;
  }
  &[type="search"] {
    /* background: url("${searchIcon}") 1rem center/1rem no-repeat; */
    padding: 0.625rem 0 0.625rem 15px;
    ::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }
    &:focus {
      background: none;
      /* padding-left: 1.625rem; */
      outline: none;
      ::-webkit-search-cancel-button {
        -webkit-appearance: none;
        min-width: 16px;
        min-height: 16px;
        width: 1rem;
        height: 1rem;
        padding-right: 1rem;
        background: url("${cancelIcon}") center/0.938rem no-repeat;
        cursor: pointer;
      }
    }
    &:hover {
      outline: none;
    }
  }
`;
