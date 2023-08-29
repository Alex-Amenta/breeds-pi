import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Landing from "./views/landing/Landing";
import Home from "./views/home/Home";
import Detail from "./views/detail/Detail";
import Navbar from "./components/navbar/Navbar";
import Form from "./views/form/Form";
import { useState } from "react";

function App() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      {location.pathname !== "/" && <Navbar setCurrentPage={setCurrentPage} />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <Home currentPage={currentPage} setCurrentPage={setCurrentPage} />
          }
        />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </>
  );
}

export default App;
