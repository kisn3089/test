import Button from "../../../atoms/Button";
import Text from "../../../atoms/Text";
import { GenderContentWrapper } from "./style";

const GenderContent = (props) => {
  const { genderRecoil, handleClickGender } = props;
  return (
    <GenderContentWrapper>
      <Text content="What is your gender?" />
      <Button
        id="0"
        className={genderRecoil === "0" ? "male-selected" : "male"}
        content="Male"
        handleClick={handleClickGender}
      />
      <Button
        id="1"
        className={genderRecoil === "1" ? "female-selected" : "female"}
        content="Female"
        handleClick={handleClickGender}
      />
    </GenderContentWrapper>
  );
};

export default GenderContent;
