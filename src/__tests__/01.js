import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import Usage from '../exercises-final/01'
// import Usage from '../exercises/01'

test('clicking the button increments the count', () => {
  const {container} = render(<Usage />)
  const button = container.querySelector('button')
  fireEvent.click(button)
  expect(button).toHaveTextContent('1')
})
