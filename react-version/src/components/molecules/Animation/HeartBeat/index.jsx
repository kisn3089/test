import React from "react";
import { HeartBeatWrapper } from "./style";
import Lottie from "react-lottie";
import LottieData from "./../../../../assets/animation/ani_heartrate.json";

const HeartBeat = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LottieData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <HeartBeatWrapper>
      <Lottie options={defaultOptions} height="100%" width="100%" />
    </HeartBeatWrapper>
  );
};

export default HeartBeat;
