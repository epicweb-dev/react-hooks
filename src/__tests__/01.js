import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Usage from '../final/01'
// import Usage from '../exercise/01'

test('clicking the button increments the count', () => {
  const {container} = render(<Usage />)
  const button = container.querySelector('button')
  fireEvent.click(button)
  expect(button).toHaveTextContent('1')
})
