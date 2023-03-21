import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";
import finnHub from '../apis/finnHub';

function StockPage() {

  const symbol = useParams().stock;

  useEffect(() => {

    const fetchData = async () => {

      const date = new Date;
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

      console.log(responses);

    };

    fetchData();

  }, []);

  return (
    <div>StockPage {symbol}</div>
  )
}

export default StockPage;
