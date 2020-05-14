import React, { useState, useEffect } from 'react';
import { HTTP } from '../../helpers/http-common';
import SearchBar from '../layout/searchbar';
import ActionBar from '../layout/actionbar';
import CountersContainer from '../layout/counterscontainer';
import CreateCounter from '../sections/createcounters';
import CreateExamples from '../sections/createexamples';

const Counters = (props) => {
  // const [term, setTerm] = useState('');
  const [counters, setCounters] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [isActive, setIsActive] = useState(false);
  const [isActiveExample, setIsActiveExample] = useState(false);
  const [counterName, setCounterName] = useState('');

  useEffect(() => {
    // console.log(props);
    setStatus('pending');
    fetchCounters().then(
      (countersData) => {
        setStatus('resolved');
        setCounters(countersData);
      },
      (errorData) => {
        setStatus('rejected');
        setError(errorData);
      },
    );
  }, []);

  function fetchCounters() {
    return HTTP.get('counter').then((response) => response.data);
  }

  function saveCounter(event) {
    setStatus('pending');
    HTTP.post('counter', { title: counterName })
      .then((response) => {
        setStatus('resolved');
        setCounters([response.data, ...counters]);
      })
      .catch((error) => {
        setError(error.data);
        setStatus('rejected');
      });
  }
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
        handleChange={(event) => {
          setCounterName(event.target.value);
        }}
        handleSubmit={saveCounter}
        isActive={isActive}
        isActiveExample={isActiveExample}
        counterName={counterName}
      />
      <CreateExamples
        handleClickClose={() => {
          setIsActiveExample(false);
        }}
        handleClickExample={(event) => {
          setCounterName(event.target.innerText);
          setIsActiveExample(false);
        }}
        isActive={isActiveExample}
      />
    </>
  );
};

export default Counters;
