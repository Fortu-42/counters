import React from 'react';
import SearchBar from '../layout/searchbar';
import ActionBar from '../layout/actionbar';

const Counters = (props) => {
  return (
    <div className='container mx-auto px-2 py-2'>
      <SearchBar />
      <ActionBar />
    </div>
  );
};

export default Counters;
