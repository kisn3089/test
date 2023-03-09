import React from "react";
import Text from "../../atoms/Text";
import { PrepareWrapper } from "./style";

const Prepare = () => {
  return (
    <PrepareWrapper>
      <Text className="title" content="Preparation" />
      <Text content="Please position your face in the circle." />
    </PrepareWrapper>
  );
};

export default Prepare;
