import styled from "styled-components";

export const StyledInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: start;
  border: 10px;
  width: 200px;
  height: 70px;
  padding: 20px 40px;
  transition: 0.3s;
  box-sizing: border-box;
  &::placeholder {
    color: #000;
    opacity: 0.3;
  }
  &:focus {
    outline: none;
  }
`;
