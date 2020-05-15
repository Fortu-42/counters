import React, { useState } from 'react';
import SearchBar from '../layout/searchbar';
import ActionBar from '../layout/actionbar';
import CountersContainer from '../layout/counterscontainer';
import CreateCounter from '../sections/createcounters';
import CreateExamples from '../sections/createexamples';
import useCounters from '../../hooks/useCounters';

const Counters = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [isActiveExample, setIsActiveExample] = useState(false);

  const { counters, status } = useCounters('fetch');

  return (
    <>
      <SearchBar />

      <CountersContainer status={status} counters={counters} />

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
      />
      <CreateExamples
        handleClickClose={() => {
          setIsActiveExample(false);
        }}
        isActive={isActiveExample}
      />
    </>
  );
};

export default Counters;
