import React, { useState } from "react";

const ConverterForm = () => {
  const [amount, setAmount] = useState(""); // Input amount
  const [fromCurrency, setFromCurrency] = useState("USD"); // Base currency
  const [toCurrency, setToCurrency] = useState("NPR"); // Target currency
  const [result, setResult] = useState(""); // Converted value

  const handleConvert = async (e) => {
    e.preventDefault();

    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const rate = data.rates[toCurrency];
    setResult((amount * rate).toFixed(2)); // Calculate and set the result
  };

  return (
    <div className="converter-container">
      <h1>Currency Converter</h1>
      <form onSubmit={handleConvert}>
        {/* Amount input */}
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        {/* From currency selection */}
        <div>
          <label>From:</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <option value="NPR">NPR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
          </select>
        </div>

        {/* To currency selection */}
        <div>
          <label>To:</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="NPR">NPR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
          </select>
        </div>

        {/* Convert button */}
        <button type="submit">
          <b>Convert</b>
        </button>
      </form>

      {/* Display result */}
      {result && (
        <div>
          <p>
            {amount} {fromCurrency} = {result} {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
};

export default ConverterForm;
