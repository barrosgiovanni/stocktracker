import React from 'react';
import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

function SearchBar() {

  const [searchTerm, setSearchTerm] = useState('');

  const [searchList, setSearchList] = useState([]);

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

  const renderSearchResults = searchList.map((result) => {
    return (
      <li className='dropdown-item d-flex justify-content-between align-middle' key={result.symbol}>
        <div>{result.description} ({result.symbol})</div>
        <button className='btn-add'>+ Add</button>
      </li>
    )
  });

  // const handleShow = () => {
  //   return searchList.length > 0 ? 'dropdown-menu show' : 'dropdown-menu';
  // }

  return (
    <div className='w-100 p-5 rounded mx-auto d-flex justify-content-center'>
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
