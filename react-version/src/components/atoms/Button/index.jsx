import { StyledButton } from "./styles";
import * as Svg from "./../../icons";

const Button = (props) => {
  const { id, className, content, handleClick } = props;

  return (
    <StyledButton className={className} id={id} onClick={handleClick}>
      {className === "male" ? (
        <Svg.Male />
      ) : className === "male-selected" ? (
        <Svg.MaleSelected />
      ) : className === "female" ? (
        <Svg.Female />
      ) : className === "female-selected" ? (
        <Svg.FemaleSeleted />
      ) : (
        <></>
      )}
      {content}
    </StyledButton>
  );
};

export default Button;
