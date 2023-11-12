import { Route, Routes } from "react-router-dom";
import Home from "./mains/home.jsx";
import Checklist from "./mains/checklist.jsx";
import About from "./mains/about.jsx";
import Contact from "./mains/contact.jsx";
import Return from "./mains/return.jsx";

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/return" element={<Return />} />
      </Routes>
    </main>
  );
};

export default Main;
