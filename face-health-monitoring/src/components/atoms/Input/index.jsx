import { StyledInput } from "./styles";
import { memo } from "react";
import React from "react";

const Input = (props) => {
  const {
    className,
    type,
    value,
    name,
    handleChange,
    placeholder,
    id,
    autoComplete,
    handleKeyPress,
    onFocus,
    onBlur,
    onKeyUp,
    onKeyDown,
    min,
    max,
  } = props;

  return (
    <StyledInput
      className={className}
      type={type}
      value={value}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      placeholder={placeholder}
      autoFocus={true}
      name={name}
      maxLength={3}
      id={id}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      autoComplete={autoComplete}
      inputmode="numeric"
      min={min}
      max={max}
    />
  );
};

export default memo(Input);
