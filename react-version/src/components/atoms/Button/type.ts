import { CSSProperties, ReactElement } from "react";

export interface IStyledButton {
  color?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  borderRadius?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  padding?: string;
  customStyle?: CSSProperties;
  type?: string;
}

export interface IButton extends IStyledButton {
  className?: string;
  id?: string;
  content?: string | ReactElement;
  disabled?: boolean;
  handleClick?: (e: any) => void | Promise<void>;
}
