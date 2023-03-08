import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as Pages from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pages.GenderPage />} />
        <Route path="/age" element={<Pages.AgePage />} />
        <Route path="/measure" element={<Pages.MeasurePage />} />
        <Route path="/result" element={<Pages.ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
