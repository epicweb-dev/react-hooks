import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import App from '../final/01'
// import App from '../exercise/01'

test('clicking the button increments the count', () => {
  const {container} = render(<App />)
  const button = container.querySelector('button')
  fireEvent.click(button)
  expect(button).toHaveTextContent('1')
})
