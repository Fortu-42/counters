import React, { useState } from 'react';
import { CountersProvider } from '../counterscontext';
import SearchBar from '../layout/searchbar';
import ActionBar from '../layout/actionbar';
import CountersContainer from '../layout/counterscontainer';
import CreateCounter from '../sections/createcounters';
import CreateExamples from '../sections/createexamples';

const Counters = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [isActiveExample, setIsActiveExample] = useState(false);
  const [counterName, setCounterName] = useState('');

  return (
    <CountersProvider>
      <SearchBar />

      <CountersContainer />

      <ActionBar
        handleClick={() => {
          setIsActive(true);
        }}
      />
      <CreateCounter
        handleClickClose={() => {
          setIsActive(false);
        }}
        handleClick={() => {
          setIsActiveExample(true);
        }}
        isActive={isActive}
        name={counterName}
        setName={setCounterName}
      />
      <CreateExamples
        handleClickClose={() => {
          setIsActiveExample(false);
        }}
        isActive={isActiveExample}
        setName={setCounterName}
      />
    </CountersProvider>
  );
};

export default Counters;
