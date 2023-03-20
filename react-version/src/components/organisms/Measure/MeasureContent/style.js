import styled from "styled-components";

export const MeasureContentWrapper = styled.div`
  width: 100%;
  height: calc(100% - 5.997001499250375vh);
  position: relative;
`;

export const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  canvas {
    display: none;
  }
`;
