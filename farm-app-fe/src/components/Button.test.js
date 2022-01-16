import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Button from './Button'

test('Button has text component', () => {
  const buttonComponent = render(
    <Button label="button label" />
  )
  const el = buttonComponent.getByText('button label')
  expect(el).toBeDefined()
})