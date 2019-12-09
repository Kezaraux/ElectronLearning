import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import DirectoryPicker from "./components/DirectoryPicker";

function App() {
  return (
    <div className="App container-fluid">
      <DirectoryPicker />
    </div>
  );
}

export default App;
