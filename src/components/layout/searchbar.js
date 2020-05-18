import React, { useState, useEffect } from 'react';
import { GoSearch } from 'react-icons/go';
import { useCountersDispatch } from '../counterscontext';
const SearchBar = () => {
  const [term, setTerm] = useState('');
  const [focusState, setFocusState] = useState(false);

  const countersDispatch = useCountersDispatch();

  useEffect(() => {
    countersDispatch({ type: 'filter', payload: { term } });
  }, [term, countersDispatch]);

  function handleFocusSearch() {
    setFocusState(true);
  }
  function handleBlurSearch() {
    setFocusState(false);
    setTerm('');
  }
  return (
    <div className='bg-white container mx-auto form-control flex items-stretch w-full fixed top-0 pt-2 px-3'>
      <div className='form-control flex items-center relative w-full'>
        <GoSearch className='absolute left-0 ml-2 text-sm' />
        <input
          placeholder='Search Counters'
          className=' placeholder-gray-400 text-black placeholder-black pl-8 py-2 w-full flex items-center border border-solid border-transparent rounded-md focus:border-orange-500 focus:outline-none shadow-md w-full transition ease-linear duration-200'
          type='text'
          onFocus={handleFocusSearch}
          onChange={(event) => {
            setTerm(event.target.value);
          }}
          value={term}
        />
      </div>
      <button
        onClick={handleBlurSearch}
        className={`${
          focusState
            ? 'w-auto px-4 py-2  ml-2 opacity-100 pointer-events-auto'
            : 'w-0 px-0 py-0 m-0 opacity-0 pointer-events-none'
        } focus:outline-0 transition-all duration-500 ease-in-out h-auto font-semibold text-sm text-black bg-white shadow-md rounded  border-solid border border-gray-300`}>
        Cancel
      </button>
    </div>
  );
};

export default SearchBar;
