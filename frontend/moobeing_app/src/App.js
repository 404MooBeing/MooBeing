import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router";
import "./utils/fcm"

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
