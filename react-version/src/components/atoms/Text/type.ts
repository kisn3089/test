import { CSSProperties } from "react";

export interface IText {
  className?: string;
  color?: string;
  margin?: string;
  padding?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  customStyle?: CSSProperties;
  content?: any;
  opacity?: string;
  hidden?: boolean;
  type?: any;
  handleClick?: (e: any) => void | Promise<void>;
  onBlur?: () => void;
  onMouseEnter?: (e: any) => void;
}
