import { useMemo, memo } from "react";
import { StyledText } from "./styles";
import { IText } from "./type";

const Text = (props: IText) => {
  const {
    className,
    content,
    handleClick,
    padding,
    margin,
    color,
    opacity,
    customStyle,
    hidden,
    fontSize,
    fontWeight,
    fontFamily,
    onBlur,
    onMouseEnter,
  } = props;

  const style = useMemo(() => {
    return {
      color,
      padding,
      margin,
      opacity,
      fontSize,
      fontWeight,
      fontFamily,
      ...customStyle,
    };
  }, [
    color,
    padding,
    margin,
    customStyle,
    opacity,
    fontSize,
    fontWeight,
    fontFamily,
  ]);

  return (
    <StyledText
      className={className}
      hidden={hidden}
      style={style}
      onClick={handleClick}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
    >
      {content}
    </StyledText>
  );
};

export default memo(Text);
