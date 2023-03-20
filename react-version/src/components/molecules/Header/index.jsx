import React from "react";
import { HeaderWrapper } from "./style";
import * as Svg from "./../../icons";
import Text from "../../atoms/Text";

const Header = (props) => {
  const { option, content, handleClickPrev, handleClickOK } = props;

  return (
    <HeaderWrapper>
      {option === "main" || option === "result" ? (
        <></>
      ) : (
        <Svg.Arrow onClick={handleClickPrev} />
      )}
      <Text content={content} />
      {option === "result" ? (
        <Text className="ok-btn" content="OK" handleClick={handleClickOK} />
      ) : (
        <></>
      )}
    </HeaderWrapper>
  );
};

export default Header;
