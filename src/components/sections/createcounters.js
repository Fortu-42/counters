import React from 'react';
import { IoIosClose } from 'react-icons/io';
const CreateCounter = (props) => {
  return (
    <div className='fixed top-0 left-0 h-full w-full bg-black bg-opacity-25 flex items-end'>
      <div className='h-99/100 w-full bg-white rounded-t-lg'>
        <div className='container mx-auto py-4 px-4 border-b border-gray-300'>
          <div className='flex items-center '>
            <button className=' bg-gray-500 text-white mr-3 rounded-full text-2xl'>
              <IoIosClose />
            </button>
            <h1 className='font-semibold'>Create Counter</h1>
            <button className='bg-orange-500 ml-auto shadow-md px-4 py-1 text-white rounded-md'>
              Save
            </button>
          </div>
        </div>
        <div className='container mx-auto px-4 py-4'>
          <div className='form-control flex flex-col'>
            <label htmlFor='counter-name'>Name</label>
            <input
              id='counter-name'
              placeholder='Search Counters'
              className='text-black placeholder-black pl-8 py-2 w-full flex items-center border border-solid border-transparent rounded-md focus:border-orange-500 focus:outline-none shadow-md w-full transition ease-linear duration-200'
              type='text'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCounter;
