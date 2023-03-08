import { StyledButton } from "./styles";
import { IButton } from "./type";
import { memo, useMemo } from "react";

const Button = (props: IButton) => {
  const {
    id,
    className,
    color,
    width,
    height,
    minWidth,
    minHeight,
    content,
    fontSize,
    fontWeight,
    fontFamily,
    borderRadius,
    backgroundColor,
    backgroundImage,
    customStyle,
    disabled,
    handleClick,
  } = props;

  const style = useMemo(() => {
    return {
      ...customStyle,
      width,
      height,
      minWidth,
      minHeight,
      color,
      fontSize,
      borderRadius,
      backgroundColor,
      fontWeight,
      fontFamily,
    };
  }, [
    width,
    height,
    minWidth,
    minHeight,
    color,
    fontSize,
    borderRadius,
    backgroundColor,
    fontWeight,
    fontFamily,
    customStyle,
  ]);

  return (
    <StyledButton
      className={className}
      id={id}
      style={style}
      backgroundImage={backgroundImage}
      disabled={disabled}
      onClick={handleClick}
    >
      {content}
    </StyledButton>
  );
};

export default memo(Button);
