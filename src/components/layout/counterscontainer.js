import React, { useEffect } from 'react';
// import MyContext from '../contexProvider';
import {
  useCountersState,
  useCountersDispatch,
  fetchCounters,
} from '../counterscontext';
import Counter from '../counter';
import Loader from '../loader';
import EmptyState from '../emptystate';
import ErrorState from '../errorstate';

const CountersContainer = () => {
  const countersDispatch = useCountersDispatch();
  const { status, counters } = useCountersState();

  useEffect(() => {
    fetchCounters(countersDispatch);
  }, [countersDispatch]);

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
        return <Counter key={counter.id} counter={counter} />;
      });
    }

    if (status === 'pending' || status === 'idle') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return (
        <ErrorState
          title="Couldn't load the counters"
          description='The internet connection appears to be offline.'
        />
      );
    }
  }
  return (
    <div className='container mx-auto px-3 min-h-full'>{renderCounters()}</div>
  );
};

export default CountersContainer;
