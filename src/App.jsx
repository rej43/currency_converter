import React from "react";
import ConverterForm from "./ConverterForm";

const App = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Currency Converter</h1>
      <ConverterForm />
    </div>
  );
};

export default App;
