import { StyledButton } from "./styles";
import { memo } from "react";
import * as Svg from "./../../icons/index";

const Button = (props) => {
  const { id, className, content, disabled, handleClick } = props;

  return (
    <StyledButton
      className={className}
      id={id}
      disabled={disabled}
      onClick={handleClick}
    >
      {id === "Male" ? (
        className === "selected" ? (
          <Svg.GenderSelectedM />
        ) : (
          <Svg.GenderM />
        )
      ) : id === "Female" ? (
        className === "selected" ? (
          <Svg.GenderSelectedF />
        ) : (
          <Svg.GenderF />
        )
      ) : (
        <></>
      )}
      {content}
    </StyledButton>
  );
};

export default memo(Button);
