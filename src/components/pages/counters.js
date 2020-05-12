import React from 'react';
import SearchBar from '../layout/searchbar';
import ActionBar from '../layout/actionbar';
import CountersContainer from '../layout/counterscontainer';
import CreateCounter from '../sections/createcounters';

const Counters = (props) => {
  // const [term, setTerm] = useState('');
  return (
    <>
      <SearchBar />

      <CountersContainer />

      <ActionBar />
      <CreateCounter />
    </>
  );
};

export default Counters;
