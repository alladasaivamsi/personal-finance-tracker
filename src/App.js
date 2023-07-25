import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" Component={SignUp} />
          <Route path="/dashboard" Component={Dashboard} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
