import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";
import finnHub from '../apis/finnHub';
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

function StockList() {

  const { watchList, stocks, setStocks, deleteFromWatchList } = useGlobalContext();

  const navigate = useNavigate();

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
        console.log(error);
      }

    }

    fetchData();

    return () => isMounted = false;

  }, [watchList]);

  const handleStockSelection = (symbol) => {
    navigate(`stock/${symbol}`);
  };

  const renderStocks = stocks.map((stock) => {

    return (
        <tr className='table-row' key={stock.symbol}>
          <th scope='row' onClick={() => handleStockSelection(stock.symbol)}>{stock.symbol}</th>
          <td>{stock.c}</td>
          {stock.d >= 0 ?
            <td className='text-success'>{stock.d}<BsFillCaretUpFill /></td> :
            <td className='text-danger'>{stock.d}<BsFillCaretDownFill /></td>}
          {stock.d >= 0 ?
            <td className='text-success'>{stock.dp}<BsFillCaretUpFill /></td> :
            <td className='text-danger'>{stock.dp}%<BsFillCaretDownFill /></td>}
          <td>{stock.h}</td>
          <td>{stock.l}</td>
          <td>{stock.o}</td>
          <td>{stock.pc}</td>
          <td><button className="btn-delete" onClick={() => deleteFromWatchList(stock.symbol)}>- Delete</button></td>
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
            <th></th>
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
