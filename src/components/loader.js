import React from 'react';
import loader from '../assets/img/loader.svg';

const Loader = () => {
  return (
    <div className='flex h-full items-center justify-center'>
      <img className='loader' src={loader} alt='loader' />
    </div>
  );
};

export default Loader;
