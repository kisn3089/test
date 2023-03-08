import { StyledButton } from "./styles";

const Button = (props) => {
  const { id, className, content, handleClick } = props;

  return (
    <StyledButton className={className} id={id} onClick={handleClick}>
      {content}
    </StyledButton>
  );
};

export default Button;
