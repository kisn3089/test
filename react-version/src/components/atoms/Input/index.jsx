import { StyledInput } from "./styles";
import React from "react";

const Input = (props) => {
  const {
    className,
    type,
    value,
    name,
    handleChange,
    placeholder,
    maxLength,
    id,
    isAutoFocus = false,
    isReadOnly = false,
    autoComplete,
    handleKeyPress,
    onFocus,
    onBlur,
    onKeyUp,
    onKeyDown,
  } = props;

  return (
    <StyledInput
      className={className}
      type={type}
      value={value}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      placeholder={placeholder}
      autoFocus={isAutoFocus}
      readOnly={isReadOnly}
      isReadOnly={isReadOnly}
      name={name}
      maxLength={maxLength}
      id={id}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      autoComplete={autoComplete}
      inputmode="numeric"
    />
  );
};

export default Input;
