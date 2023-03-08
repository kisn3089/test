import Button from "../../../atoms/Button";
import { GenderFooterWrapper } from "./style";

const GenderFooter = (props) => {
  const { genderRecoil, handleClickNext } = props;

  return (
    <GenderFooterWrapper>
      <Button
        className={genderRecoil !== "" ? "on" : ""}
        content="Next"
        handleClick={handleClickNext}
      />
    </GenderFooterWrapper>
  );
};

export default GenderFooter;
