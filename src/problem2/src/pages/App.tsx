import React from "react";
import Header from "../components/Header";
import CoinChange from "../components/CoinChange";

function App() {
  return (
    <div className="h-full">
      <Header />
      <div className="flex justify-center">
        <CoinChange />
      </div>
    </div>
  );
}

export default App;
