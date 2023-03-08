import Button from "../../../atoms/Button";
import { GenderFooterWrapper } from "./style";

const GenderFooter = (props) => {
  const { genderRecoil } = props;
  return (
    <GenderFooterWrapper>
      <Button />
    </GenderFooterWrapper>
  );
};

export default GenderFooter;
