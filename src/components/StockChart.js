import { useGlobalContext } from "../context/AppContext";
import Chart from "react-apexcharts";

function StockChart({ symbol }) {

  const { chartData, interval, setInterval } = useGlobalContext();
  const { day, week, month, year } = chartData;

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

  const timeFormat = defineTimeFormat();

  // console.log(chartData);
  // console.log(chartData.day === true || chartData.day === false ? 'true' : 'false');

  // let color = '#fff';
  // color = defineTimeFormat()[defineTimeFormat().length - 1].y - defineTimeFormat()[0].y > 0 ?
  // '#26C281' : '#ED3419'
  // console.log(color);

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
    data: timeFormat
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
