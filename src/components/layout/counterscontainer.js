import React, { useEffect } from 'react';
import { IoIosRefresh } from 'react-icons/io';
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
  const { status, counters, error } = useCountersState();

  useEffect(() => {
    fetchCounters(countersDispatch);
  }, [countersDispatch]);

  const countersNumber = counters.length;
  const timesCountedNumber = counters.reduce(
    (accumulated, current) => accumulated + current.count,
    0,
  );

  function renderCountersReady() {
    return counters.map((counter) => {
      return <Counter key={counter.id} counter={counter} />;
    });
  }

  function renderCounters() {
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

    if (counters.length === 0) {
      return (
        <EmptyState
          title='No Counters Yet!'
          description='“When I started counting my blessings, my whole life turned around.” <br>   —Willie Nelson'
        />
      );
    }
    return (
      <>
        <small className='text-gray-500 text-sm mb-4 flex items-center flex-no-wrap'>
          <span className='text-black font-semibold mr-2'>
            {countersNumber} Items
          </span>{' '}
          <span>{timesCountedNumber} Times</span>
          <button
            onClick={() => fetchCounters(countersDispatch, 'refresh')}
            className={`${
              status === 'pending refresh' ? 'text-orange-500' : 'text-black'
            } text-sm ml-2 flex items-center flex-no-wrap focus:outline-0`}>
            <IoIosRefresh className='mr-1' />
            {status === 'pending refresh' ? 'Refreshing...' : ''}
          </button>
        </small>
        <div>{renderCountersReady()}</div>
      </>
    );
  }
  return (
    <div
      className={`${
        counters.length === 0 || status === 'pending' || status === 'rejected'
          ? 'justify-center'
          : 'justify-start'
      } container mx-auto px-3 min-h-full flex flex-col flex-grow`}>
      {renderCounters()}
    </div>
  );
};

export default CountersContainer;
