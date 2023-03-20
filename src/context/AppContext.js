import React, { useContext, useState } from "react";

const AppContext = React.createContext();

function AppProvider({ children }) {

  const [ watchList, setWatchList ] = useState(['GOOGL', 'MSFT', 'AMZN']);
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchList, setSearchList] = useState([]);

  const addStockToWatchList = (newStock) => {
    const updatedWatchList = [...watchList, newStock];
    setWatchList(updatedWatchList);
    setSearchTerm('');
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
        deleteFromWatchList
      }}

    >
      { children }
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider };
