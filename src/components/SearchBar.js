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

    const fetchData = async () => {

      try {

        const response = await finnHub.get('/search', {
          params: {
            q: searchTerm
          }
        });

        console.log(response);

      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

  }, [searchTerm])



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
        <ul className='dropdown-menu'>
          <li>Stock1</li>
          <li>Stock2</li>
          <li>Stock3</li>
          <li>Stock4</li>
          <li>Stock5</li>
          <li>Stock6</li>
          <li>Stock7</li>
          <li>Stock8</li>
        </ul>
      </div>
    </div>
  )
}

export default SearchBar;
