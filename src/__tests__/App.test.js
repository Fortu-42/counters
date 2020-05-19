import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('does the body have the word counters in it?', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/counters/i);
  expect(linkElement).toBeInTheDocument();
});
