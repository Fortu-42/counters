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
  const { status, counterSelected } = useCountersState();

  useEffect(() => {
    if (status === `incremented ${id}`) {
      setMyCount(myCount + 1);
    }
    if (status === `decremented ${id}`) {
      setMyCount(myCount - 1);
    }
  }, [status]); // eslint-disable-line
  // react warning beacuse of useEffect dependencies

  const isSelected = counterSelected && counterSelected.id === id ? true : false;

  return (
    <button
      onFocus={() => countersDispatch({ type: 'select counter', payload: { id, count, title } })}
      className={`${
        isSelected ? 'bg-orange-500 bg-opacity-25' : ''
      } transition duration-500 cursor-pointer ease-in-out flex items-center w-full justify-between px-2 py-3 my-3 focus:outline-none rounded`}>
      <p>{title}</p>
      <div className='flex items-center '>
        <a
          href='#0'
          onClick={(event) => {
            event.stopPropagation();
            decrementCounter(countersDispatch, { id, count, title });
          }}
          disabled={myCount === 0 ? true : false}
          className={`${
            myCount === 0 ? 'text-gray-500' : 'text-orange-500'
          } mr-3 text-xl font-semibold`}>
          <BsDash />
        </a>
        <span className={`${myCount === 0 ? 'text-gray-500' : 'text-black'} font-semibold`}>
          {myCount}
        </span>
        <a
          href='#0'
          onClick={(event) => {
            event.stopPropagation();
            incrementCounter(countersDispatch, { id, count, title });
          }}
          className='ml-3 text-xl text-orange-500 font-semibold'>
          <BsPlus />
        </a>
      </div>
    </button>
  );
};

export default Counter;
