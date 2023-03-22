import React from 'react';
import Chart from "react-apexcharts";

function StockChart({ chartData, symbol }) {

  const { day, week, month, year } = chartData;

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
  }

  const series = [{
    name: symbol,
    data: day
  }]

  return (
    <div className='chart-display mt-5 p-4 shadow-sm'>
      <Chart
        options={options}
        series={series}
        type='area'
        width='100%' />
      <div className='interval-buttons mt-3'>
        <button className='btn-interval'>Day</button>
        <button className='btn-interval'>Week</button>
        <button className='btn-interval'>Month</button>
        <button className='btn-interval'>Year</button>
      </div>
    </div>
  )
}

export default StockChart;
