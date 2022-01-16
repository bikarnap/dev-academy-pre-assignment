import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Button from './Button'

test('renders learn react link', () => {
  render(<Button label="next" />);
  const element = screen.getByText(/next/i);
  expect(element).toBeInTheDocument();
});