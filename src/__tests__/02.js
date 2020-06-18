import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../final/02'
// import App from '../exercise/02'

afterEach(() => {
  window.localStorage.removeItem('name')
})

test('App works', () => {
  window.localStorage.setItem('name', 'jill')
  render(<App />)
  screen.getByText(/hello.*jill/i)
  userEvent.clear(screen.getByRole('textbox', {name: /name/i}))
  userEvent.type(screen.getByRole('textbox', {name: /name/i}), 'bob')
  screen.getByText(/hello.*bob/i)
  expect(window.localStorage.getItem('name')).toBe('bob')
})
