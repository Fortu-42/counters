import React from 'react';
import { BsPlus } from 'react-icons/bs';
const ActionBar = () => {
  return (
    <div className='flex items-center w-full fixed bottom-0 left-0 mb-2 px-2'>
      <div className='flex items-center justify-end relative w-full border-solid border-t border-gray-300 pt-2'>
        <button className='bg-orange-500 px-4 py-1 text-white text-xl rounded-md'>
          <BsPlus />
        </button>
      </div>
    </div>
  );
};

export default ActionBar;
