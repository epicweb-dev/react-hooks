import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import App from '../final/03.extra-1'
// import App from '../exercise/03'

beforeAll(() => {
  jest.spyOn(Storage.prototype, 'getItem')
})

beforeEach(() => {
  Storage.prototype.getItem.mockClear()
})

afterEach(() => {
  window.localStorage.removeItem('count')
})

test('App works', () => {
  window.localStorage.setItem('count', 3)
  const {container} = render(<App />)
  const button = container.getElementsByTagName('button')[0]
  expect(button).toHaveTextContent(/3/)
  fireEvent.click(button)
  expect(button).toHaveTextContent(/4/)
  fireEvent.click(button)
  expect(button).toHaveTextContent(/5/)
  // make sure that localStorage.getItem is only called once despite multiple re-renders
  expect(Storage.prototype.getItem).toHaveBeenCalledTimes(1)
  expect(window.localStorage.getItem('count')).toBe('5')
})
