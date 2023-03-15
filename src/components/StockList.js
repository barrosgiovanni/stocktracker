import React from 'react';
import { useState, useEffect } from "react";
import finnHub from '../apis/finnHub';

function StockList() {

  const [ watchList, setWatchList ] = useState(['GOOGL', 'MSFT', 'AMZN', 'APPL']);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await finnHub.get('/quote?symbol=MSFT');
        console.log(response);
      } catch (error) {

      }
    }

    fetchData();

  }, [])

  return (
    <div>StockList</div>
  )
}

export default StockList;
