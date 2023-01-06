import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SurveyGenderPage from "./pages/SurveyGenderPage";
import SurveyAgePage from "./pages/SurveyAgePage";
import MeasurePage from "./pages/MeasurePage";
import PreparePage from "./pages/PreparePage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SurveyGenderPage />}></Route>
        <Route path="/survey" element={<SurveyAgePage />}></Route>
        <Route path="/prepare" element={<PreparePage />}></Route>
        <Route path="/measure" element={<MeasurePage />}></Route>
        <Route path="/result" element={<ResultPage />}></Route>
        <Route path="*" element={<></>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
