import styled from "styled-components";

export const StyledText = styled.span`
  display: inline-block;
  color: #000000;
  font-size: 2.5487256371814095vh;
  font-weight: 700;

  &.description {
    font-size: 2.9985007496251876vh;
  }

  &#ResultBody {
    font-family: "notoSansBold";
    font-size: 2.9985007496251876vh;
  }

  &.Resultgrade {
    height: 4.497751124437781vh;
    min-height: 30px;
    margin-top: 1.4992503748125938vh;
    margin-bottom: 2.9985007496251876vh;
    font-size: 2.9985007496251876vh;
  }

  &.Resultrate {
    margin-top: 7.496251874062969vh;
    margin-bottom: 3.2983508245877062vh;
    font-size: 2.9985007496251876vh;
  }

  &.result {
    font-family: "notoSansBold";
    font-size: 2.9985007496251876vh;
  }

  &.grade {
    height: 6.5967016491754125vh;
    min-height: 44px;
    font-family: "notoSansBold";
    font-size: 4.497751124437781vh;
    letter-spacing: -0.408px;
    margin-top: 2.9985007496251876vh;
    margin-bottom: 4.497751124437781vh;
  }
  &.grade.one {
    color: #0dcd2c;
  }
  &.grade.two {
    color: #95db00;
  }
  &.grade.three {
    color: #ffd600;
  }
  &.grade.four {
    color: #ff6b00;
  }
  &.grade.five {
    color: #ff0000;
  }

  &.comment {
    height: 3.598200899550225vh;
    min-height: 24px;
    line-height: 3.598200899550225vh;
    font-family: "notoSansLight";
    font-size: 2.39880059970015vh;
  }

  &.score {
    height: 7.496251874062969vh;
    min-height: 50px;
    font-size: 7.496251874062969vh;
    letter-spacing: -0.408px;
  }

  &.unit {
    font-size: 2.9985007496251876vh;
    font-family: "notoSansLight";
    margin-left: 1.4992503748125938vh;
  }
`;
