import "./App.css";
import { HomePage } from "./components/HomePage";
import { Routes, Route } from "react-router-dom";
import { ImageUpload } from "./components/ImageUpload";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/imageupload" element={<ImageUpload />}></Route>
      </Routes>
    </>
  );
}

export default App;
