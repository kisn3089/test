import styled from "styled-components";

export const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
`;

export const ModalContent = styled.div`
  width: 89.333vw;
  max-width: 670px;
  height: 34.48275862068966vh;
  z-index: 20;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2.9985007496251876vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  button {
    width: 100%;
    height: 8.995502248875562vh;
    font-size: 2.9985007496251876vh;
    font-family: "notoSans";
    color: #006fad;
    background-color: #fff;
    border-radius: 0;
    border-top: 1px solid #e6e6e6;
  }
`;

export const TextWrapper = styled.div`
  width: 100%;
  height: calc(100% - 9.145427286356822vh);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    font-size: 2.9985007496251876vh;
    font-family: "notoSans";
    line-height: 4.497751124437781vh;
    text-align: center;
    letter-spacing: -0.408px;
  }
`;
