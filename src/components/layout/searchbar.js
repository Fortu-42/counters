import React from 'react';
import { GoSearch } from 'react-icons/go';
const SearchBar = () => {
  return (
    <div className='form-control flex items-center w-full fixed top-0 left-0 mt-2 px-2'>
      <div className='form-control flex items-center relative w-full'>
        <GoSearch className='absolute left-0 ml-2 text-sm' />
        <input
          className='pl-8 py-2 w-full flex items-center border border-solid border-transparent rounded-md focus:border-orange-500 focus:outline-none shadow-md w-full transition ease-linear duration-200'
          type='text'
        />
      </div>
    </div>
  );
};

export default SearchBar;
