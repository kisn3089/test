import React from "react";
import { HeaderWrapper } from "./style";
import * as Svg from "./../../icons";
import Text from "../../atoms/Text";

const Header = (props) => {
  const { option, content } = props;

  return (
    <HeaderWrapper>
      {option === "main" ? <></> : <Svg.Arrow />}
      <Text content={content} />
    </HeaderWrapper>
  );
};

export default Header;
