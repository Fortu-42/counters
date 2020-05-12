import React from 'react';
import SearchBar from '../layout/searchbar';
import ActionBar from '../layout/actionbar';
import CountersContainer from '../layout/counterscontainer';

const Counters = (props) => {
  // const [term, setTerm] = useState('');
  return (
    <>
      <SearchBar />

      <CountersContainer />

      <ActionBar />
    </>
  );
};

export default Counters;
