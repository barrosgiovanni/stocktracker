import { useEffect } from "react";
import { useGlobalContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
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
          <td className='text-center'>{Math.floor(stock.c * 100) / 100}</td>
          {stock.d >= 0 ?
            <td className='text-success text-center'>{Math.floor(stock.d * 100) / 100}<BsFillCaretUpFill /></td> :
            <td className='text-danger text-center'>{Math.floor(stock.d * 100) / 100}<BsFillCaretDownFill /></td>}
          {stock.d >= 0 ?
            <td className='text-success text-center'>{Math.floor(stock.dp * 100) / 100}<BsFillCaretUpFill /></td> :
            <td className='text-danger text-center'>{Math.floor(stock.dp * 100) / 100}%<BsFillCaretDownFill /></td>}
          <td className='text-center'>{Math.floor(stock.h * 100) / 100}</td>
          <td className='text-center'>{Math.floor(stock.l * 100) / 100}</td>
          <td className='text-center'>{Math.floor(stock.o * 100) / 100}</td>
          <td className='text-center'>{Math.floor(stock.pc * 100) / 100}</td>
          <td className= 'd-flex justify-content-end me-3 px-0'><button className="btn-delete mx-0 px=0" onClick={() => deleteFromWatchList(stock.symbol)}>- Delete</button></td>
        </tr>
    )
  });

  return (
    <div className="table-container">
      <table className='table hover mt-5'>
        <thead className='table-head'>
          <tr>
            <th scope='col'>Symbol</th>
            <th className='text-center' scope='col'>Price</th>
            <th className='text-center' scope='col'>Change</th>
            <th className='text-center' scope='col'>Change%</th>
            <th className='text-center' scope='col'>High</th>
            <th className='text-center' scope='col'>Low</th>
            <th className='text-center' scope='col'>Open</th>
            <th className='text-center' scope='col'>Close</th>
            <th className=" text-center mx-0 px-0"></th>
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
