import React from 'react';
import {
  useCountersState,
  useCountersDispatch,
  incrementCounter,
  decrementCounter,
} from './counterscontext';

const Modal = () => {
  const { status, error, modal } = useCountersState();
  const countersDispacth = useCountersDispatch();

  const errorType = error && error.type ? error.type : null;
  const errorTitle = error && error.title ? error.title : null;
  const errorCount = error && error.count ? error.count : null;
  const errorId = error && error.id ? error.id : null;

  function handleRetryClick() {
    const { id, count, title } = error;
    if (errorType === 'increment') {
      incrementCounter(countersDispacth, { id, count, title });
    }
    if (errorType === 'decrement') {
      decrementCounter(countersDispacth, { id, count, title });
    }
  }

  function handleClickDismiss() {
    countersDispacth({ type: 'close modal' });
  }

  function countToDisplay() {
    const { count } = error;
    if (errorType === 'increment') {
      return count + 1;
    }
    if (errorType === 'decrement') {
      return count - 1;
    }
  }

  function renderContent() {
    if (status.includes('rejected')) {
      if (errorTitle && errorType && errorCount && errorId) {
        return (
          <>
            <h1 className='text-lg text-center font-semibold mb-2'>
              Couldn't update "{errorTitle}" to {countToDisplay()}
            </h1>
            <p className='text-center font-light mb-4'>
              The internet connection appears to be offline
            </p>
            <div className='flex items-center'>
              <button
                onClick={handleRetryClick}
                className='font-semibold text-sm text-white bg-orange-500 shadow-md rounded px-4 py-2 border-none mr-4'>
                Retry
              </button>
              <button
                onClick={handleClickDismiss}
                className='font-semibold text-sm text-orange-500 bg-white shadow-md rounded px-4 py-2 border-none'>
                Dismiss
              </button>
            </div>
          </>
        );
      }
      if (errorType === 'create') {
        return (
          <>
            <h1 className='text-lg text-center font-semibold mb-2'>Couldn't create counter</h1>
            <p className='text-center font-light mb-4'>
              The internet connection appears to be offline
            </p>
            <button
              onClick={handleClickDismiss}
              className='font-semibold text-sm text-white bg-orange-500 shadow-md rounded px-4 py-2 border-none'>
              Dismiss
            </button>
          </>
        );
      }
      return;
    }
  }

  return (
    <div
      className={`${
        modal === true && error
          ? 'opacity-100 visible pointer-events-auto'
          : 'opacity-0 invisible pointer-events-none'
      } transition-opacity duration-500 ease-in-out flex items-center justify-center fixed h-full w-full top-0 left-0 z-50 bg-black bg-opacity-50`}>
      <div className='p-4 mx-4 bg-white flex flex-col items-center rounded-md'>
        {renderContent()}
      </div>
    </div>
  );
};

export default Modal;
