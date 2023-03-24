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
        <tr className='table-row' onClick={() => handleStockSelection(stock.symbol)} key={stock.symbol}>
          <th className='stock-symbol' scope='row'>{stock.symbol}</th>
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
          <td className= 'display-buttons me-0 px-0'>
            <button className="btn-delete mx-1"
              onClick={(e) => {
                e.stopPropagation()
                deleteFromWatchList(stock.symbol)
              }}> - Remove </button>
            <button className="btn-details mx-1"
              onClick={(e) => {
                e.stopPropagation()
                handleStockSelection(stock.symbol)
              }}> + Info </button>
          </td>
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
            <th className='text-center me-0' scope='col'>Close</th>
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
