import React from "react";
import { HeaderWrapper } from "./style";
import * as Svg from "./../../icons";
import Text from "../../atoms/Text";

const Header = (props) => {
  const { option, content, handleClickPrev } = props;

  return (
    <HeaderWrapper>
      {option === "main" ? <></> : <Svg.Arrow onClick={handleClickPrev} />}
      <Text content={content} />
    </HeaderWrapper>
  );
};

export default Header;
