import { useState, useEffect } from 'react';
import fetchCounters from '@/hooks/fetchCounters';
// import stateRequest from './state';

function useSaveCounter(counterName = null) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [newCounter, setNewCounter] = useState({});

  const counters = fetchCounters();

  useEffect(() => {
    if (counterName !== null) {
      setStatus('pending');
      createCounter().then(
        (countersData) => {
          setStatus('resolved');
          setNewCounter(countersData);
        },
        (errorData) => {
          setStatus('rejected');
          setError(errorData);
        },
      );
    }
  }, []);

  function createCounter() {
    return HTTP.post('counter', { title: counterName }).then(
      (response) => response.data,
    );
  }

  const countersToReturn = [...counters, newCounter];

  return { countersToReturn, status, error };
}

export default useSaveCounter;
