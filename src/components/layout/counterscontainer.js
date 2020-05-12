import React, { useState, useEffect } from 'react';
import { HTTP } from '../../helpers/http-common';
import Counter from '../counter';
import Loader from '../loader';
import EmptyState from '../emptystate';

const CountersContainer = (props) => {
  const [counters, setCounters] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
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
  }, [props]);

  function fetchCounters() {
    return HTTP.get('counter').then((response) => response.data);
  }

  function renderCounters() {
    // console.log(counters);
    if (status === 'resolved') {
      if (counters.length === 0) {
        return (
          <EmptyState
            title='No Counters Yet!'
            description='“When I started counting my blessings, my whole life turned around.” <br>   —Willie Nelson'
          />
        );
      }
      return counters.map((counter) => {
        return <Counter counter={counter} />;
      });
    }

    if (status === 'pending' || status === 'idle') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <div>OH NO!</div>;
    }
  }
  return (
    <div className='py-20 container mx-auto px-2 py-2 h-full'>
      {renderCounters()}
    </div>
  );
};

export default CountersContainer;
