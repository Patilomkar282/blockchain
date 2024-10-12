import React, { useState } from 'react';
import ChartComponent from './Components/chart.js';

function App() {
  const [symbol, setSymbol] = useState('ethusdt'); // Default to ETH/USDT
  const [interval, setInterval] = useState('1m');  // Default to 1-minute interval

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleIntervalChange = (event) => {
    setInterval(event.target.value);
  };

  return (
    <div className="App">
      <h1>Binance Market Data WebSocket</h1>
      <div className="controls">
        <label>Select Cryptocurrency:</label>
        <select value={symbol} onChange={handleSymbolChange}>
          <option value="ethusdt">ETH/USDT</option>
          <option value="bnbusdt">BNB/USDT</option>
          <option value="dotusdt">DOT/USDT</option>
        </select>

        <label>Select Interval:</label>
        <select value={interval} onChange={handleIntervalChange}>
          <option value="1m">1 Minute</option>
          <option value="3m">3 Minute</option>
          <option value="5m">5 Minute</option>
        </select>
      </div>

      <ChartComponent symbol={symbol} interval={interval} />
    </div>
  );
}

export default App;
