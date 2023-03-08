import Button from "../../../atoms/Button";
import Text from "../../../atoms/Text";
import { GenderContentWrapper } from "./style";

const GenderContent = (props) => {
  const { genderRecoil } = props;
  return (
    <GenderContentWrapper>
      <Text />
      <Button className={genderRecoil === 0 ? "male-selected" : "male"} />
      <Button className={genderRecoil === 1 ? "female-selected" : "female"} />
    </GenderContentWrapper>
  );
};

export default GenderContent;
