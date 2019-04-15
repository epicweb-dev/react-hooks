import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import Usage from '../exercises-final/03-extra.0'
// import Usage from '../exercises/03'

beforeAll(() => {
  jest.spyOn(Storage.prototype, 'getItem')
})

beforeEach(() => {
  Storage.prototype.getItem.mockClear()
})

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
  // make sure that localStorage.getItem is only called once despite multiple re-renders
  expect(Storage.prototype.getItem).toHaveBeenCalledTimes(1)
  expect(window.localStorage.getItem('count')).toBe('5')
})
