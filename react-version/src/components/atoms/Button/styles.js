import styled from "styled-components";

export const StyledButton = styled.button`
  display: flex;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 5.997001499250375vh;
  align-items: center;
  outline: none;
  border: none;
  background-color: #ffffff;
  color: #000000;
  width: 49.17541229385307vh;
  height: 11.99400299850075vh;
  min-width: 328px;
  min-height: 80px;
  font-size: 2.39880059970015vh;
  font-weight: 700;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  gap: 1.4992503748125938vh;
  margin-bottom: 2.9985007496251876vh;
  transition: all 0.3s;
  &:disabled {
    background-color: #006fad;
    color: "#fff";
  }
  &.selected,
  &.next.selected {
    background-color: #006fad;
    color: #fff;
  }
  &.next {
    background-color: #d9d9d9;
    color: #ffffff;
    font-size: 2.9985007496251876vh;
    width: 50.37481259370315vh;
    height: 8.995502248875562vh;
    min-width: 336px;
    min-height: 60px;
    border-radius: 10.494752623688155vh;
    box-shadow: none;
  }

  &.measure {
    width: 14.992503748125937vh;
    height: 5.097451274362819vh;
    min-width: 100px;
    min-height: 34px;
    background-color: #006fad;
    font-size: 2.098950524737631vh;
    font-family: "notoSansLight";
    color: #ffffff;
    line-height: 5.097451274362819vh;
    cursor: inherit;
  }

  &.close {
    width: 3.7481259370314843vh;
    height: 3.7481259370314843vh;
    line-height: 25px;
    min-width: 25px;
    min-height: 25px;
    font-size: 2.5487256371814095vh;
    font-family: "notoSansBold";
    letter-spacing: -0.408px;
    box-shadow: none;
    position: absolute;
    top: 1.3493253373313343vh;
    right: 2.9985007496251876vh;
  }
`;
