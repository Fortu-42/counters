import React from 'react';
import { useCountersDispatch, fetchCounters } from './counterscontext';

const ErrorState = (props) => {
  const CounterDispatch = useCountersDispatch();
  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <h1 className='text-xl font-bold mb-4 text-center'>{props.title}</h1>
      <p
        dangerouslySetInnerHTML={{ __html: props.description }}
        className='text-center font-light'></p>
      <button
        onClick={() => fetchCounters(CounterDispatch)}
        className='font-semibold text-sm text-orange-500 bg-white shadow-md rounded px-4 py-2 border-none'></button>
    </div>
  );
};

export default ErrorState;
