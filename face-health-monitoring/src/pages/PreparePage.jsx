import React from "react";
import usePrepare from "../hooks/usePrepare";
import PrepareTemplate from "../templates/PrepareTemplate";

const PreparePage = () => {
  const { handleClickPrev, handleClickPrepareBtn } = usePrepare();
  return (
    <PrepareTemplate
      handleClickPrev={handleClickPrev}
      handleClickPrepareBtn={handleClickPrepareBtn}
    />
  );
};

export default PreparePage;
