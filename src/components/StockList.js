import React from 'react';
import { useState, useEffect } from "react";
import finnHub from '../apis/finnHub';

function StockList() {

  const [stocks, setStocks] = useState([]);

  const [ watchList, setWatchList ] = useState(['GOOGL', 'MSFT', 'AMZN']);

  useEffect(() => {

    let isMounted = true;

    const fetchData = async () => {

      try {

        const responses = await Promise.all(watchList.map((symbol) => {

          return finnHub.get('/quote', {
            params: {
              symbol: symbol
            }
          });
        }));

        const updatedResponses = responses.map((response) => {
          const symbol = response.config.params.symbol;
          const data = response.data;
          return {...data, symbol};
        })

        if (isMounted) {
          setStocks(updatedResponses);
        }

      } catch (error) {

      }

    }

    fetchData();

    return () => isMounted = false;

  }, []);

  const renderStocks = stocks.map((stock) => {
    return (
        <tr className='table-row' key={stock.symbol}>
          <th scope='row'>{stock.symbol}</th>
          <td>{stock.c}</td>
          {stock.d > 0 ? <td className='text-success'>{stock.d}</td> : <td className='text-danger'>{stock.d}</td>}
          {stock.d > 0 ? <td className='text-success'>{stock.d}</td> : <td className='text-danger'>{stock.dp}%</td>}
          <td>{stock.h}</td>
          <td>{stock.l}</td>
          <td>{stock.o}</td>
          <td>{stock.pc}</td>
        </tr>
    )
  });

  return (
    <div>
      <table className='table hover mt-5'>
        <thead className='table-head'>
          <tr>
            <th scope='col'>Symbol</th>
            <th scope='col'>Price</th>
            <th scope='col'>Change</th>
            <th scope='col'>Change %</th>
            <th scope='col'>High</th>
            <th scope='col'>Low</th>
            <th scope='col'>Open</th>
            <th scope='col'>Close</th>
          </tr>
        </thead>
        <tbody>
          {renderStocks}
        </tbody>
      </table>
    </div>
  )
}

export default StockList;
