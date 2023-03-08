import { StyledInput } from "./styles";
import { IInput } from "./type";
import { CSSProperties, memo } from "react";
import React from "react";

const Input = React.forwardRef<HTMLInputElement, IInput>((props, ref) => {
  const {
    className,
    type,
    value,
    name,
    handleChange,
    placeholder,
    backgroundColor,
    borderRadius,
    color,
    customStyle,
    fontSize,
    fontFamily,
    height,
    margin,
    padding,
    width,
    maxLength,
    id,
    border,
    isAutoFocus = false,
    isReadOnly = false,
    autoComplete,
    handleKeyPress,
    onFocus,
    onBlur,
    onKeyUp,
    onKeyDown,
  } = props;

  const style: CSSProperties = {
    ...customStyle,
    backgroundColor,
    borderRadius,
    color,
    fontSize,
    fontFamily,
    height,
    margin,
    padding,
    width,
  };

  return (
    <StyledInput
      ref={ref}
      className={className}
      type={type}
      value={value}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      placeholder={placeholder}
      style={style}
      autoFocus={isAutoFocus}
      readOnly={isReadOnly}
      isReadOnly={isReadOnly}
      name={name}
      maxLength={maxLength}
      id={id}
      border={border}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      autoComplete={autoComplete}
    />
  );
});

export default memo(Input);
