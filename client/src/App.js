import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavBar from "./components/AppNavBar";
import ItemList from "./components/ItemList";

function App() {
  return (
    <div className="App">
      <AppNavBar />
      <ItemList />
    </div>
  );
}

export default App;
