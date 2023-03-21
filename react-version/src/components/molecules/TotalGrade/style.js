import styled from "styled-components";

export const TotalGradeWrapper = styled.div`
  width: 89.333vw;
  max-width: 670px;
  text-align: left;

  span {
    font-size: 2.9985007496251876vh;
    font-family: "notoSansBold";
  }

  .invalid {
    margin-top: 0.7496251874062969vh;
    font-size: 2.39880059970015vh;
    font-family: "notoSans";
    color: #ff0000;
  }
`;

export const GradeBoxWrapper = styled.div`
  width: 89.333vw;
  max-width: 670px;
  height: 34.03298350824588vh;
  max-height: 454px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 2.9985007496251876vh;
  margin-top: 2.9985007496251876vh;
  padding: 2.9985007496251876vh;
  box-sizing: border-box;

  span.grade {
    font-size: 4.497751124437781vh;
    margin: 2.9985007496251876vh 0 4.497751124437781vh 0;
  }
  span.grade.grade1 {
    color: #0dcd2c;
  }
  span.grade.grade2 {
    color: #95db00;
  }
  span.grade.grade3 {
    color: #ffd600;
  }
  span.grade.grade4 {
    color: #ff6b00;
  }
  span.grade.grade5 {
    color: #ff0000;
  }
`;

export const TextWrapper = styled.div`
  width: 100%;
  text-align: left;

  span {
    font-size: 2.39880059970015vh;
    font-family: "notoSans";
    line-height: 3.598200899550225vh;
  }
`;
