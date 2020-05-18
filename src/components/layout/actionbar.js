import React from 'react';
import { BsPlus, BsTrash, BsBoxArrowUp } from 'react-icons/bs';
import { useCountersState, useCountersDispatch } from '../counterscontext';
const ActionBar = ({ handleClick }) => {
  const { counterSelected } = useCountersState();
  const countersDispatch = useCountersDispatch();
  function renderActions() {
    return (
      <div
        className={`${
          counterSelected
            ? 'opacity-100 visible pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none'
        } transition-opacity duration-500 ease-in-out flex items-center`}>
        <button
          onClick={() => countersDispatch({ type: 'confirm delete' })}
          className='py-2 px-4 shadow-md border-gray-300 border border-solid rounded-md text-red-600 mr-2'>
          <BsTrash />
        </button>
        <button className='py-2 px-4 shadow-md border-gray-300 border border-solid rounded-md text-black font-semibold'>
          <BsBoxArrowUp />
        </button>
      </div>
    );
  }
  return (
    <div className='bg-white container flex items-center w-full fixed bottom-0 pb-2 px-3'>
      <div className='flex items-center relative w-full border-solid border-t border-gray-300 pt-2'>
        {renderActions()}
        <button
          onClick={handleClick}
          className='bg-orange-500 ml-auto shadow-md px-4 py-1 text-white text-xl rounded-md'>
          <BsPlus />
        </button>
      </div>
    </div>
  );
};

export default ActionBar;
