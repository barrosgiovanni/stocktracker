import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

function AppProvider({ children }) {

  const [watchList, setWatchList] = useState(['AAPL', 'MSFT', 'AMZN', 'NVDA', 'GOOGL', 'TSLA', 'META', 'XOM', 'JNJ', 'ABBV', 'CVX', 'AVGO', 'MRK', 'LLY', 'PEP', 'KO', 'PFE']);
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [interval, setInterval] = useState('1d');

  useEffect(() => {
    localStorage.setItem('watchList', watchList)
  }, [watchList])


  const addStockToWatchList = (newStock) => {

    const isIncluded = watchList.filter((stock) => {
      return stock === newStock;
    })

    if (isIncluded.length === 0) {
      const updatedWatchList = [...watchList, newStock];
      setWatchList(updatedWatchList);
      setSearchTerm('');
    }

  }

  const deleteFromWatchList = (removedStock) => {
    const updatedWatchList = watchList.filter((stock) => {
      return stock !== removedStock
    });
    setWatchList(updatedWatchList);
  }

  return (
    <AppContext.Provider
      value= {{
        watchList,
        setWatchList,
        stocks,
        setStocks,
        searchTerm,
        setSearchTerm,
        searchList,
        setSearchList,
        addStockToWatchList,
        deleteFromWatchList,
        interval,
        setInterval
      }}>
      { children }
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider };
