import { useState, useEffect } from 'react';
// import stateRequest from './state';

function useFetchCounters(props) {
  const [counters, setCounters] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

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

  return { counters, status, error };
}

export default useFetchCounters;
