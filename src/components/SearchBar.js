import { useEffect } from "react";
import { useGlobalContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import finnHub from "../apis/finnHub";

function SearchBar() {

  const {searchTerm, setSearchTerm, searchList, setSearchList, watchList, addStockToWatchList, deleteFromWatchList} = useGlobalContext();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    let isMounted = true;
    const fetchSearchData = async () => {
      try {
        const response = await finnHub.get('/search', {
          params: {
            q: searchTerm
          }
        });
        if (isMounted) {
          setSearchList(response.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (searchTerm.length > 0) {
      fetchSearchData();
      return () => isMounted = false;
    } else {
      setSearchList([]);
    }
  }, [searchTerm]);

  const handleNavigation = (symbol) => {
    navigate(`stock/${symbol}`);
  };

  const renderButton = (symbol) => {
    if (watchList.includes(symbol)) {
      return <button className='btn-delete' onClick={(e) => {
        e.stopPropagation()
        deleteFromWatchList(symbol)}}>- Remove</button>
    } else {
      return <button className='btn-add' onClick={(e) => {
        e.stopPropagation()
        addStockToWatchList(symbol)}}>+ Add</button>
    }
  };

  const renderSearchResults = searchList.map((result) => {
    return (
      <li className='dropdown-item d-flex justify-content-between align-middle' key={result.symbol} onClick={() => handleNavigation(result.symbol)}>
        <div className='stock-title'>{result.description} ({result.symbol})</div>
        {renderButton(result.symbol)}
      </li>
    )
  });

  return (
    <div className='search-bar w-100 pb-4 pt-5 rounded mx-auto d-flex justify-content-center'>
      <div className='form-floating dropdown'>
        <input
          id='search'
          type='text'
          value={searchTerm}
          onChange={handleChange}
          className='form-control'
          autoComplete='off'
          placeholder="Which stock would you like to track?">
        </input>
        <label htmlFor='search'>Which stock would you like to track?</label>
        <ul className={searchList.length > 0 ? 'dropdown-menu show' : 'dropdown-menu'}>
          {renderSearchResults}
        </ul>
      </div>
    </div>
  )
}

export default SearchBar;
