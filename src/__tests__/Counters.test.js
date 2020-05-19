import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useCountersState, CountersProvider } from '../components/counterscontext';

test('default props are correct', async () => {
  const wrapper = ({ children }) => <CountersProvider>{children}</CountersProvider>;
  const { result } = renderHook(() => useCountersState(), { wrapper });

  expect(result.current.status).toEqual('idle');
  expect(result.current.error).toBe(null);
  expect(result.current.counters).toEqual([]);
  expect(result.current.filtered).toEqual([]);
  expect(result.current.modal).toBe(false);
  expect(result.current.counterSelected).toEqual(null);
});
