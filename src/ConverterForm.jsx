import React, { useState } from "react";
import ResultDisplay from "./ResultDisplay";

const ConverterForm = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [conversionRate, setConversionRate] = useState(null);
  const [error, setError] = useState("");

  // Function to validate form inputs
  const validateInputs = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      return false;
    }
    if (fromCurrency === toCurrency) {
      setError("Please select different currencies.");
      return false;
    }
    setError("");
    return true;
  };

  // Function to fetch conversion rate and calculate result
  const handleConvert = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      const rate = data.rates[toCurrency];
      setConversionRate(rate * amount);
    } catch (err) {
      setError("Failed to fetch conversion rates. Please try again later.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
      <form onSubmit={handleConvert} style={{ marginBottom: "20px" }}>
        <div>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              style={{ margin: "10px 0", padding: "5px", width: "100%" }}
              required
            />
          </label>
        </div>
        <div>
          <label>
            From:
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              style={{ margin: "10px", padding: "5px" }}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="NPR">NPR</option>
              <option value="INR">INR</option>
            </select>
          </label>
          <label>
            To:
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              style={{ margin: "10px", padding: "5px" }}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="NPR">NPR</option>
              <option value="INR">INR</option>
            </select>
          </label>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Convert
        </button>
      </form>
      {conversionRate !== null && (
        <ResultDisplay
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          result={conversionRate}
        />
      )}
    </div>
  );
};

export default ConverterForm;
