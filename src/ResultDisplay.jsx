import React from "react";

const ResultDisplay = ({ amount, fromCurrency, toCurrency, result }) => {
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
      }}
    >
      <h3>Conversion Result</h3>
      <p>
        {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
      </p>
    </div>
  );
};

export default ResultDisplay;
