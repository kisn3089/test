import React from "react";
import { LoadingWrapper } from "./style";
import Lottie from "react-lottie";
import LottieData from "./../../../../assets/animation/loading.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LottieData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <LoadingWrapper>
      <Lottie options={defaultOptions} height="100%" width="100%" />
    </LoadingWrapper>
  );
};

export default Loading;
