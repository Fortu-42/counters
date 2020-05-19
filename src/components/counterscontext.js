import React, { useReducer } from 'react';
import { HTTP } from '../helpers/http-common';

const CountersStateContext = React.createContext();
const CountersDispatchContext = React.createContext();

function countersReducer(state, action) {
  switch (action.type) {
    case 'pending':
      if (action.payload === 'refresh') {
        return {
          ...state,
          modal: false,
          status: 'pending refresh',
        };
      }
      if (action.payload === 'increment') {
        return {
          ...state,
          modal: false,
          status: 'pending increment',
        };
      }
      if (action.payload === 'decrement') {
        return {
          ...state,
          modal: false,
          status: 'pending decrement',
        };
      }
      return {
        ...state,
        modal: false,
        status: 'pending',
      };
    case 'error': {
      if (action.payload.type) {
        return {
          ...state,
          status: `rejected ${action.payload.type}`,
          modal: true,
          error: {
            type: action.payload.type,
            title: action.payload.title,
            id: action.payload.id ? action.payload.id : null,
            count: action.payload.count ? action.payload.count : null,
          },
        };
      }
      return {
        ...state,
        status: 'rejected',
        error: { ...action.payload },
      };
    }
    case 'fetched': {
      return {
        ...state,
        status: 'resolved',
        error: null,
        // modal: false,
        counters: [...action.payload],
      };
    }
    case 'created': {
      return {
        ...state,
        status: 'resolved',
        error: null,
        modal: false,
        counters: [...state.counters, { ...action.payload }],
      };
    }
    case 'incremented': {
      return {
        ...state,
        error: null,
        modal: false,
        status: `incremented ${action.payload.id}`,
      };
    }
    case 'decremented': {
      return {
        ...state,
        error: null,
        modal: false,
        status: `decremented ${action.payload.id}`,
      };
    }
    case 'close modal': {
      return {
        ...state,
        modal: false,
      };
    }
    case 'select counter': {
      const {
        payload: { id, count, title },
      } = action;
      return {
        ...state,
        counterSelected: {
          id,
          count,
          title,
        },
      };
    }
    case 'clear selected': {
      return {
        ...state,
        counterSelected: null,
      };
    }
    case 'confirm delete': {
      return {
        ...state,
        status: 'confirm',
        modal: true,
      };
    }
    case 'deleted': {
      const newCounters = state.counters.filter(({ id }) => {
        return id !== action.payload.id;
      });
      return {
        counters: [...newCounters],
        status: 'resolved',
        error: null,
        modal: false,
      };
    }
    case 'filter': {
      const newCounters = state.counters.filter((counter) => {
        return (
          counter.title.includes(`${action.payload.term}`) ||
          counter.title.includes(`${action.payload.term.toLowerCase()}`) ||
          counter.title.includes(`${action.payload.term.toUpperCase()}`)
        );
      });
      return {
        ...state,
        status: 'filter',
        filtered: [...newCounters],
      };
    }
    case 'blur filter': {
      return {
        ...state,
        status: 'idle',
        filtered: [],
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
    filtered: [],
    modal: false,
    counterSelected: null,
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
    throw new Error('useCountDispatch must be used within a CountersProvider');
  }
  return context;
}

function createCounter(dispatch, title, test = null) {
  // console.log(dispatch);

  if (test && test.url && test.title) {
    dispatch({ type: 'pending' });
    return new Promise((resolve, reject) => {
      HTTP.post('counter', { title: test.title })
        .then((response) => {
          // console.log(response.data);
          dispatch({ type: 'created', payload: response.data });
          resolve();
        })
        .catch((error) => {
          dispatch({ type: 'error', payload: { type: 'create', title, ...error.data } });
          reject();
        });
    });
  }

  dispatch({ type: 'pending' });

  HTTP.post('counter', { title })
    .then((response) => {
      // console.log(response.data);
      dispatch({ type: 'created', payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: 'error', payload: { type: 'create', title, ...error.data } });
    });
}

function fetchCounters(dispatch, refresh = false, test = null) {
  dispatch({ type: 'pending', payload: refresh });

  if (Boolean(refresh) === true) {
    dispatch({ type: 'clear selected' });
  }

  if (test && test.url) {
    return new Promise((resolve, reject) => {
      HTTP.get(test.url)
        .then((response) => {
          dispatch({ type: 'fetched', payload: response.data });
          resolve();
        })
        .catch((error) => {
          dispatch({ type: 'error', payload: error.data });
          reject();
        });
    });
  }

  HTTP.get('counter')
    .then((response) => {
      dispatch({ type: 'fetched', payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: 'error', payload: error.data });
    });
}

function incrementCounter(dispatch, { id, count, title }) {
  dispatch({ type: 'pending', payload: 'increment' });

  HTTP.post('counter/inc/', { id })
    .then((response) => {
      dispatch({ type: 'incremented', payload: response.data });
      fetchCounters(dispatch, 'refresh');
    })
    .catch((error) => {
      dispatch({
        type: 'error',
        payload: { id, count, title, type: 'increment', ...error.data },
      });
    });
}

function decrementCounter(dispatch, { id, count, title }) {
  dispatch({ type: 'pending', payload: 'decrement' });

  HTTP.post('counter/dec/', { id })
    .then((response) => {
      dispatch({ type: 'decremented', payload: response.data });
      fetchCounters(dispatch, 'refresh');
    })
    .catch((error) => {
      dispatch({
        type: 'error',
        payload: { id, count, title, type: 'decrement', error },
      });
    });
}

function deleteCounter(dispatch, { id, title }) {
  dispatch({ type: 'pending', payload: 'refresh' });
  HTTP.delete('counteer', {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    data: { id },
  })
    .then(() => {
      dispatch({ type: 'deleted', payload: { id, title } });
    })
    .catch((error) => {
      dispatch({ type: 'error', payload: { id, title, type: 'delete', ...error.data } });
    });
}

// function closeModal(dispatch) {
//   dispatch({ type: 'close modal' });
// }

export {
  CountersProvider,
  useCountersState,
  useCountersDispatch,
  createCounter,
  fetchCounters,
  incrementCounter,
  decrementCounter,
  deleteCounter,
};
