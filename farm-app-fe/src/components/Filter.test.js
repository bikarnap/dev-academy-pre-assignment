import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Filter from './Filter'

test('renders filter type text', () => {
  const component = render(
    <Filter 
      filterType="sensor"
    />  
  )
  expect(component.container).toHaveTextContent(
    'sensor'
  )
})