import React, { useState, useEffect } from 'react';
import {
  useCountersState,
  useCountersDispatch,
  incrementCounter,
  decrementCounter,
} from './counterscontext';

import { BsPlus, BsDash } from 'react-icons/bs';

const Counter = ({ counter: { count, title, id } }) => {
  const [myCount, setMyCount] = useState(count);
  const countersDispatch = useCountersDispatch();
  const { status } = useCountersState();

  useEffect(() => {
    if (status === `incremented ${id}`) {
      setMyCount(myCount + 1);
    }
    if (status === `decremented ${id}`) {
      setMyCount(myCount - 1);
    }
  }, [status]); // eslint-disable-line
  // react warning beacuse of useEffect dependencies

  return (
    <div className='flex items-center w-full justify-between mb-6'>
      <p>{title}</p>
      <div className='flex items-center '>
        <button
          onClick={() =>
            decrementCounter(countersDispatch, { id, count, title })
          }
          disabled={myCount === 0 ? true : false}
          className={`${
            myCount === 0 ? 'text-gray-500' : 'text-orange-500'
          } mr-3 text-xl font-semibold`}>
          <BsDash />
        </button>
        <span
          className={`${
            myCount === 0 ? 'text-gray-500' : 'text-black'
          } font-semibold`}>
          {myCount}
        </span>
        <button
          onClick={() => {
            incrementCounter(countersDispatch, { id, count, title });
          }}
          className='ml-3 text-xl text-orange-500 font-semibold'>
          <BsPlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
