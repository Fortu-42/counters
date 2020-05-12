import React from 'react';

const EmptyState = (props) => {
  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <h1 className='text-xl font-bold mb-4 text-center'>{props.title}</h1>
      <p
        dangerouslySetInnerHTML={{ __html: props.description }}
        className='text-center font-light'></p>
    </div>
  );
};

export default EmptyState;
