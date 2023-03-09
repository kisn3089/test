import React from "react";
import Text from "../../atoms/Text";
import HeartBeat from "../Animation/HeartBeat";
import { MeasuringWrapper } from "./style";

const Measuring = () => {
  return (
    <MeasuringWrapper>
      <Text className="title" content="Measuring" />
      <Text content="Measuring now... Don’t talk or move." />
      <HeartBeat />
    </MeasuringWrapper>
  );
};

export default Measuring;
