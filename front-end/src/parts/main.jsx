import { Route, Routes } from "react-router-dom";
import Home from "./home.jsx";
import Checklist from "./checklist.jsx";

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/checklist" element={<Checklist />} />
      </Routes>
    </main>
  );
};

export default Main;
