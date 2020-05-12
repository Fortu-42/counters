import React from 'react';
import { BsPlus } from 'react-icons/bs';
const ActionBar = () => {
  return (
    <div className='container flex items-center w-full fixed bottom-0 mb-2 px-2'>
      <div className='flex items-center relative w-full border-solid border-t border-gray-300 pt-2'>
        <button className='bg-orange-500 ml-auto shadow-md px-4 py-1 text-white text-xl rounded-md'>
          <BsPlus />
        </button>
      </div>
    </div>
  );
};

export default ActionBar;
