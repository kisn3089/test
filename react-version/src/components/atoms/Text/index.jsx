import { StyledText } from "./styles";

const Text = (props) => {
  const { className, content, handleClick, hidden, onBlur, onMouseEnter } =
    props;

  return (
    <StyledText
      className={className}
      hidden={hidden}
      onClick={handleClick}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
    >
      {content}
    </StyledText>
  );
};

export default Text;
