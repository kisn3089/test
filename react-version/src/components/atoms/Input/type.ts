import React, { CSSProperties, SetStateAction } from "react";

export interface IStyledInput {
  customStyle?: CSSProperties;
  width?: string;
  height?: string;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  borderRadius?: string;
  backgroundColor?: string;
  margin?: string;
  padding?: string;
  isReadOnly?: boolean;
  border?: string;
}

export interface IInput extends IStyledInput {
  className?: string;
  id?: string;
  value?: any;
  type?: string;
  name?: string;
  placeholder?: string;
  isAutoFocus?: boolean;
  maxLength?: number;
  autoComplete?: string;
  onFocus?: (e?: any) => void;
  onBlur?: () => void;
  handleChange?: (e: any) => void | SetStateAction<any>;
  handleKeyPress?: (e: any) => void | SetStateAction<any>;
  onKeyUp?: (e: any) => void | SetStateAction<any>;
  onKeyDown?: (e: any) => void | SetStateAction<any>;
}
