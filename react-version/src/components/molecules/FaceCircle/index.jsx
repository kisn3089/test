import React from "react";
import { FaceCircleWrapper } from "./style";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const FaceCircle = (props) => {
  const { maxHistLen, timingHist } = props;
  console.log(maxHistLen, timingHist);
  return (
    <FaceCircleWrapper>
      <CircularProgressbar
        maxValue={maxHistLen}
        value={timingHist.length}
        strokeWidth={3}
        styles={buildStyles({
          // Text size
          textSize: "16px",
          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          // Colors
          pathColor: `#006FAD`,
          trailColor: "#ffffff",
          backgroundColor: "#3e98c7",
        })}
      />
    </FaceCircleWrapper>
  );
};

export default FaceCircle;
