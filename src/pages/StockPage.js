import { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from '../context/AppContext';
import finnHub from '../apis/finnHub';
import StockChart from "../components/StockChart";
import { FaArrowCircleLeft } from "react-icons/fa";

const formatData = (data) => {
  return data.t.map((record, index) => {
    return {
      x: record * 1000,
      y: Math.floor(data.c[index])
    }
  })
}

function StockPage() {

  const symbol = useParams().stock;
  const navigate = useNavigate();
  const { chartData, setChartData, interval } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {

      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      const oneDayTime = 60 * 60 * 24;

      let oneDayAgo;
      if (date.getDay() === 6) {
        oneDayAgo = currentTime - (oneDayTime * 2);
      } else if (date.getDay() === 0) {
        oneDayAgo = currentTime - (oneDayTime * 3);
      } else {
        oneDayAgo = currentTime - oneDayTime;
      }

      const oneWeekAgo = currentTime - (oneDayTime * 7);
      const oneMonthAgo = currentTime - (oneDayTime * 30);
      const oneYearAgo = currentTime - (oneDayTime * 365);

      try {
        const responses = await Promise.all([
          finnHub.get('stock/candle', {
            params: {
              symbol: symbol,
              from: oneDayAgo,
              to: currentTime,
              resolution: 15
            }
          }),
          finnHub.get('stock/candle', {
            params: {
              symbol: symbol,
              from: oneWeekAgo,
              to: currentTime,
              resolution: 60
            }
          }),
          finnHub.get('stock/candle', {
            params: {
              symbol: symbol,
              from: oneMonthAgo,
              to: currentTime,
              resolution: 'D'
            }
          }),
          finnHub.get('stock/candle', {
            params: {
              symbol: symbol,
              from: oneYearAgo,
              to: currentTime,
              resolution: 'W'
            }
          })
        ])

        const updatedChartData = {
          ...chartData,
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          month: formatData(responses[2].data),
          year: formatData(responses[3].data)
        }
        setChartData(updatedChartData);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [symbol], [chartData], [interval]);

  return (
    <div>
      { chartData &&
      <div className='chart-container d-flex justify-content-center'>
        <FaArrowCircleLeft className='btn-return' onClick={() => navigate('/')} />
        <StockChart symbol={symbol} chartData={chartData} />
      </div> }
    </div>
  )
}

export default StockPage;
