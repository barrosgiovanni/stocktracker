import { useGlobalContext } from "../context/AppContext";
import Chart from "react-apexcharts";

function StockChart({ symbol, chartData }) {

  const { interval, setInterval } = useGlobalContext();
  const { day, week, month, year } = chartData;

  const uniqueId = require('generate-unique-id');

  const defineTimeFormat = () => {
    switch (interval) {
      case '1d':
        return day;
      case '1w':
        return week;
      case '1m':
        return month;
      case '1y':
        return year;
      default:
        return day;
    }
  };

  let color = '#fff';
  color = defineTimeFormat()[defineTimeFormat().length - 1].y - defineTimeFormat()[0].y > 0 ?
  '#26C281' : '#ED3419'

  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: 'center',
      style: {
        fontSize: '28px',
        color: '#e4dcdc'
      }
    },
    chart: {
      id: uniqueId(),
      animations: {
        speed: 1200
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false,
        style: {
          colors: '#e4dcdc'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#e4dcdc'
        }
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
    <div className='chart-display p-4 pb-2 shadow'>
      <Chart
        options={options}
        series={series}
        type='area'
        width='100%'
      />
      <div className='interval-buttons mx-3 my-2'>
        <button
          onClick={() => setInterval('1d')}
          className={renderButtonSelection('1d')}>Day</button>
        <button
          onClick={() => setInterval('1w')}
          className={renderButtonSelection('1w')} >Week</button>
        <button
          onClick={() => setInterval('1m')}
          className={renderButtonSelection('1m')} >Month</button>
        <button
          onClick={() => setInterval('1y')}
          className={renderButtonSelection('1y')} >Year</button>
      </div>
    </div>
  )
}

export default StockChart;
