import React, { useReducer } from 'react';
import { HTTP } from '../helpers/http-common';

const CountersStateContext = React.createContext();
const CountersDispatchContext = React.createContext();

function countersReducer(state, action) {
  switch (action.type) {
    case 'pending':
      return {
        ...state,
        status: 'pending',
      };
    case 'error': {
      return {
        ...state,
        status: 'error',
        error: { ...action.payload },
      };
    }
    case 'fetched': {
      return {
        ...state,
        status: 'resolved',
        counters: [...state.counters, ...action.payload],
      };
    }
    case 'created': {
      return {
        ...state,
        status: 'resolved',
        counters: [...state.counters, { ...action.payload }],
      };
    }
    default:
      throw new Error("Don't understand action");
  }
}

const CountersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(countersReducer, {
    status: 'idle',
    error: null,
    counters: [],
  });
  // const { status, counters, error } = state;

  return (
    <CountersStateContext.Provider value={state}>
      <CountersDispatchContext.Provider value={dispatch}>
        {children}
      </CountersDispatchContext.Provider>
    </CountersStateContext.Provider>
  );
};

function useCountersState() {
  const context = React.useContext(CountersStateContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
}

function useCountersDispatch() {
  const context = React.useContext(CountersDispatchContext);
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider');
  }
  return context;
}

function createCounter(dispatch, title) {
  dispatch({ type: 'pending' });
  HTTP.post('counter', { title })
    .then((response) => {
      // console.log(response.data);

      dispatch({ type: 'created', payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: 'error', payload: error.data });
    });
}
function fetchCounters(dispatch) {
  dispatch({ type: 'pending' });
  return HTTP.get('counter')
    .then((response) => {
      dispatch({ type: 'fetched', payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: 'error', payload: error.data });
    });
}

export {
  CountersProvider,
  useCountersState,
  useCountersDispatch,
  createCounter,
  fetchCounters,
};
