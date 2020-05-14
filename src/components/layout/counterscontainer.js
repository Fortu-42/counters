import React from 'react';
import { HTTP } from '../../helpers/http-common';
import Counter from '../counter';
import Loader from '../loader';
import EmptyState from '../emptystate';

const CountersContainer = ({ counters, status }) => {
  // const [error, setError] = useState(null);

  function incrementCounter(id) {
    HTTP.post('counter/inc', { id }).then((response) => {
      console.log(response);
    });
  }

  function renderCounters() {
    // console.log(counters);
    if (status === 'resolved') {
      if (counters.length === 0) {
        return (
          <EmptyState
            title='No Counters Yet!'
            description='“When I started counting my blessings, my whole life turned around.” <br>   —Willie Nelson'
          />
        );
      }
      return counters.map((counter) => {
        return (
          <Counter
            key={counter.id}
            counter={counter}
            increment={incrementCounter}
          />
        );
      });
    }

    if (status === 'pending' || status === 'idle') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <div>OH NO!</div>;
    }
  }
  return (
    <div className='py-20 container mx-auto px-3 py-2 h-full'>
      {renderCounters()}
    </div>
  );
};

export default CountersContainer;
