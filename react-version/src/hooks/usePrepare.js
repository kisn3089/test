import { useNavigate } from "react-router-dom";

const usePrepare = () => {
  const navigator = useNavigate();

  const handleClickPrev = () => {
    navigator(-1);
  };

  const handleClickPrepareBtn = () => {
    navigator("/measure");
  };

  return { handleClickPrev, handleClickPrepareBtn };
};

export default usePrepare;
