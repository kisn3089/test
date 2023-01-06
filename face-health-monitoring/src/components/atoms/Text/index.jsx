import { memo } from "react";
import { StyledText } from "./styles";

const Text = (props) => {
  const { id, className, content, handleClick, onBlur, onMouseEnter } = props;

  return (
    <StyledText
      id={id}
      className={className}
      onClick={handleClick}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
    >
      {content}
    </StyledText>
  );
};

export default memo(Text);
