import styled from "styled-components";

export const StyledText = styled.span`
  display: inline-block;
  color: ${(props) =>
    props.style?.color ? props.style?.color : props.theme.white};
  margin: ${(props) => props.style?.margin};
  padding: ${(props) => props.style?.padding};
  opacity: ${(props) => (props.style?.opacity ? props.style?.opacity : "1")};
`;
