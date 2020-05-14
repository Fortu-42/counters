import React from 'react';
import { BsPlus, BsDash } from 'react-icons/bs';
const Counter = ({ counter: { count, title, id }, increment }) => {
  // console.log(increment);
  function sendIdToIncrement() {
    increment(id);
  }
  return (
    <div className='flex items-center w-full justify-between mb-6'>
      <p>{title}</p>
      <div className='flex items-center '>
        <button className='mr-3 text-xl text-orange-500 font-semibold'>
          <BsDash />
        </button>
        <span className='text-black font-semibold'>{count}</span>
        <button
          onClick={sendIdToIncrement}
          className='ml-3 text-xl text-orange-500 font-semibold'>
          <BsPlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
