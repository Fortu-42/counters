import React from 'react';
import { Link } from 'react-router-dom';
import homeLogo from '../../assets/img/counter-logo.svg';
const Home = () => {
  return (
    <div className='container h-full mx-auto flex items-center justify-center px-4'>
      <div className='flex flex-col items-center'>
        <img className='mb-24' alt='main-logo' src={homeLogo} />
        <h1 className='text-center text-lg font-semibold mb-2'>
          Welcome to Counters
        </h1>
        <p className='text-center mb-24'>
          Capture cups of lattes, frapuccinos, or anything else that can be
          counted.
        </p>
        <Link
          to='/counters'
          className='font-semibold text-sm text-white bg-orange-500 shadow-md rounded px-4 py-2 border-none'>
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
