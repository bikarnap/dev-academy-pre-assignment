import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Filter from './Filter'

test('renders learn react link', () => {
  render(<Filter fitlerType="sensor" />);
  const element = screen.getByText(/sensor/i);
  expect(element).toBeInTheDocument();
});
