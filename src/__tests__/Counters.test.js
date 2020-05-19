import React from 'react';
import { render } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import { renderHook } from '@testing-library/react-hooks';
import { createCounter, useCountersState, CountersProvider } from '../components/counterscontext';
import CountersContainer from '../components/layout/counterscontainer';
import { act } from 'react-dom/test-utils';

test('counter is correctly created', async () => {
  const wrapper = ({ children }) => <CountersProvider>{children}</CountersProvider>;
  const { result } = renderHook(() => useCountersState(), { wrapper });

  expect(result.current.status).toEqual('idle');
  expect(result.current.error).toBe(null);
  expect(result.current.counters).toEqual([]);
  expect(result.current.filtered).toEqual([]);
  expect(result.current.modal).toBe(false);
  expect(result.current.counterSelected).toEqual(null);
});
