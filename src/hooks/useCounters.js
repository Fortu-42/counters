import { useState, useEffect } from 'react';
import { HTTP } from '../helpers/http-common';

function useCounters(action, payload = {}) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    switch (action) {
      case 'fetch':
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
        break;
      case 'save':
        setStatus('pending');
        createCounter(payload.name).then(
          (counterData) => {
            setStatus('resolved');
            setCounters((counters) => [counterData, ...counters]);
          },
          (errorData) => {
            setStatus('rejected');
            setError(errorData);
          },
        );
        break;
      default:
        break;
    }
  }, [action, payload]);

  function createCounter(title) {
    return HTTP.post('counter', { title }).then((response) => response.data);
  }
  function fetchCounters() {
    return HTTP.get('counter').then((response) => response.data);
  }

  return { counters, status, error };
}

export default useCounters;
