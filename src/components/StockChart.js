import React, { useState } from 'react';
import Chart from "react-apexcharts";

function StockChart({ chartData, symbol }) {

  const { day, week, month, year } = chartData;
  const [interval, setInterval] = useState('24h');

  const defineTimeFormat = () => {
    switch (interval) {
      case '24h':
        return day;
      case '7d':
        return week;
      case '30d':
        return month;
      case '365d':
        return year;
      default:
        return day;
    }

  };

  const options = {
    title: {
      text: symbol,
      align: 'center',
      style: {
        fontSize: '28px'
      }
    },
    chart: {
      id: 'stock data',
      animations: {
        speed: 1200
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false
      }
    },
    tooltip: {
      x: {
        format: 'MMM dd HH:MM'
      }
    }
  };

  const series = [{
    name: symbol,
    data: defineTimeFormat()
  }];

  const renderButtonSelection = (button) => {
    const classes = '';
    if (button === interval) {
      return classes + 'btn-selected';
    } else {
      return classes + 'btn-interval'
    }
  };

  return (
    <div className='chart-display mt-5 p-4 shadow-sm'>
      <Chart
        options={options}
        series={series}
        type='area'
        width='100%'
      />
      <div className='interval-buttons mt-3'>
        <button
          onClick={() => setInterval('24h')}
          className={renderButtonSelection('24h')}>Day</button>
        <button
          onClick={() => setInterval('7d')}
          className={renderButtonSelection('7d')} >Week</button>
        <button
          onClick={() => setInterval('30d')}
          className={renderButtonSelection('30d')} >Month</button>
        <button
          onClick={() => setInterval('365d')}
          className={renderButtonSelection('365d')} >Year</button>
      </div>
    </div>
  )
}

export default StockChart;
