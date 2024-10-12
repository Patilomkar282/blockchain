import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import './chart.css';
import { Chart, CategoryScale, LinearScale, LineController, LineElement, PointElement } from 'chart.js';
Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement);

const ChartComponent = ({ symbol, interval }) => {
  const [chartData, setChartData] = useState([]);
  const ws = useRef(null);

  
  useEffect(() => {
    const storedData = localStorage.getItem(`${symbol}_${interval}`);
    if (storedData) {
      setChartData(JSON.parse(storedData));
    }
  }, [symbol, interval]);

 
  useEffect(() => {
    const url = `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`;
    ws.current = new WebSocket(url);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const candlestick = data.k;

      setChartData((prevData) => {
        const newData = [...prevData, {
          x: new Date(candlestick.t),
          y: [candlestick.o, candlestick.h, candlestick.l, candlestick.c]
        }];
        
        localStorage.setItem(`${symbol}_${interval}`, JSON.stringify(newData));
        return newData;
      });
    };

    return () => ws.current.close(); 
  }, [symbol, interval]);

  // Chart.js data format
  const chartConfig = {
    labels: chartData.map((data) => data.x),
    datasets: [
      {
        label: `${symbol.toUpperCase()} Price`,
        data: chartData.map((data) => data.y[3]), 
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Line data={chartConfig} />
    </div>
  );
};

export default ChartComponent;
