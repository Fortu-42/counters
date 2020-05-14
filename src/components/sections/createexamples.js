import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
const CreateCounter = ({ handleClickClose, isActive, handleClickExample }) => {
  const [examples] = useState([
    {
      id: 0,
      name: 'Drinks',
      examples: [
        {
          id: 0,
          name: 'Cups of coffe',
        },
        {
          id: 1,
          name: 'Glasses of Water',
        },
        {
          id: 2,
          name: 'Martinis',
        },
        {
          id: 3,
          name: 'Green Juices',
        },
        {
          id: 4,
          name: 'Milkshakes',
        },
        {
          id: 5,
          name: 'Smothies',
        },
      ],
    },
    {
      id: 1,
      name: 'Food',
      examples: [
        {
          id: 0,
          name: 'Hot Dogs',
        },
        {
          id: 1,
          name: 'Pizzas',
        },
        {
          id: 2,
          name: 'Arepas',
        },
        {
          id: 3,
          name: 'Tequeños',
        },
        {
          id: 4,
          name: 'Sopaipillas',
        },
      ],
    },
    {
      id: 2,
      name: 'Miscelaneous',
      examples: [
        {
          id: 0,
          name: 'Concerts',
        },
        {
          id: 1,
          name: 'Times sneezed',
        },
        {
          id: 2,
          name: 'naps',
        },
        {
          id: 3,
          name: 'keyboards broken',
        },
        {
          id: 4,
          name: 'day dreaming',
        },
        {
          id: 5,
          name: 'Concerts',
        },
      ],
    },
  ]);
  function renderExamples() {
    return examples.map(({ id, name, examples }) => {
      return (
        <div className='mb-4' key={id}>
          <p className='pl-4 font-semibold'>{name}</p>
          <div className='flex items-center overflow-x-scroll flex-no-wrap justify-start py-2'>
            {examples.map(({ name, id }, i) => {
              return (
                <button
                  key={id}
                  onClick={handleClickExample}
                  className={`${
                    i === 0 ? 'ml-4' : ''
                  } whitespace-no-wrap cursor-pointer  text-sm bg-gray-200 rounded-full py-2 px-4 shadow border border-solid border-gray-100 font-semibold mr-3`}>
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      );
    });
  }

  return (
    <div
      className={`fixed top-0 left-0 h-full w-full bg-black bg-opacity-25 flex items-end transform transition-all duration-500 z-10 ${
        isActive === true
          ? 'opacity-1 pointer-events-auto visible'
          : 'opacity-0 pointer-events-none invisible'
      }`}>
      <div
        className={`h-99/100 w-full bg-white rounded-t-lg transform transition-all duration-500 ${
          isActive === true ? 'translate-y-0' : 'translate-y-full'
        }`}>
        <div className='container mx-auto py-4 px-4 border-b border-gray-300'>
          <div className='flex items-center'>
            <button
              onClick={handleClickClose}
              className='bg-gray-500 text-white mr-3 rounded-full text-2xl'>
              <IoIosClose />
            </button>
            <h1 className='font-semibold'>Examples</h1>
          </div>
        </div>
        <div className='container px-4 pb-4'>
          <small className='text-gray-700 text-xs my-4 block'>
            Select an example to add it to your counters.
          </small>
        </div>
        <div>{renderExamples()}</div>
      </div>
    </div>
  );
};

export default CreateCounter;
