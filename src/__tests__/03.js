import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import Usage from '../exercises-final/03'
// import Usage from '../exercises/03'

afterEach(() => {
  window.localStorage.removeItem('count')
})

test('Usage works', () => {
  window.localStorage.setItem('count', 3)
  const {container} = render(<Usage />)
  const button = container.getElementsByTagName('button')[0]
  expect(button).toHaveTextContent(/3/)
  fireEvent.click(button)
  expect(button).toHaveTextContent(/4/)
  fireEvent.click(button)
  expect(button).toHaveTextContent(/5/)
  expect(window.localStorage.getItem('count')).toBe('5')
})
