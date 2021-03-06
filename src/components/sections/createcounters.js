import React, { useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import {
  useCountersState,
  useCountersDispatch,
  createCounter,
} from '../counterscontext';
import Loader from '../loader';

const CreateCounter = ({
  handleClickClose,
  isActive,
  handleClick,
  name,
  setName,
}) => {
  const { status, error } = useCountersState();
  const countersDispatch = useCountersDispatch();

  useEffect(() => {
    if (status === 'resolved') {
      setName('');
      handleClickClose();
    }
  }, [status]); // eslint-disable-line
  // react warning beacuse of useEffect dependencies

  function handleSubmit(event) {
    event.preventDefault();
    createCounter(countersDispatch, name);
  }

  return (
    <div
      className={`fixed top-0 left-0 h-full w-full bg-black bg-opacity-25 flex items-end transform transition-all duration-500 ${
        isActive === true
          ? 'opacity-1 pointer-events-auto visible'
          : 'opacity-0 pointer-events-none invisible'
      }`}>
      <div
        className={`relative h-99/100 w-full bg-white rounded-t-lg transform transition-all duration-500 ${
          isActive === true ? 'translate-y-0' : 'translate-y-full'
        }`}>
        <form onSubmit={handleSubmit}>
          <div className='container mx-auto py-4 px-4 border-b border-gray-300'>
            <div className='flex items-center'>
              <button
                type='button'
                onClick={handleClickClose}
                className='bg-gray-500 text-white mr-3 rounded-full text-2xl'>
                <IoIosClose />
              </button>
              <h1 className='font-semibold'>Create Counter</h1>
              <button
                disabled={Boolean(error)}
                type='submit'
                className={` ${
                  Boolean(error)
                    ? 'bg-orange-300 cursor-not-allowed pointer-events-none'
                    : 'bg-orange-500 cursor-pointer pointer-events-auto'
                } ml-auto shadow-md px-4 py-1 text-white rounded-md`}>
                Save
              </button>
            </div>
          </div>
          <div className='container mx-auto px-4 py-4'>
            <div className='form-control flex flex-col'>
              <label htmlFor='counter-name'>Name</label>
              <input
                required
                id='counter-name'
                placeholder='Cups of coffee'
                className='my-2 text-black placeholder-gray-700 px-2 py-2 w-full flex items-center border border-solid border-gray-300 rounded-md focus:border-orange-500 focus:outline-none shadow-inner w-full transition ease-linear duration-200'
                type='text'
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <small className='text-gray-700 text-xs'>
                Give it a name. Creative block? see
                <button
                  type='button'
                  onClick={handleClick}
                  className='underline'>
                  Examples
                </button>
              </small>
            </div>
          </div>
        </form>
        <div
          className={`${
            status === 'pending'
              ? 'opacity-100 pointer-events-auto visible'
              : 'opacity-0 pointer-events-none invisible'
          } h-full w-full bg-opacity-50 bg-white transition-opacity duration-500 ease-in-out absolute top-0 left-0 h-full w-full flex items-center justify-center`}>
          <Loader />
        </div>
      </div>
    </div>
  );
};

export default CreateCounter;
