import React from "react";
import "./App.css";
import Visualizer from "./Visualizer";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter } from "react-router-dom";

const basename =
  process.env.NODE_ENV === "production" ? "/" : "/";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <Visualizer />
      </BrowserRouter>
    </div>
  );
}

export default App;
