import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import App from '../final/02'
// import App from '../exercise/02'

afterEach(() => {
  window.localStorage.removeItem('name')
})

test('App works', () => {
  window.localStorage.setItem('name', 'jill')
  render(<App />)
  screen.getByText(/hello.*jill/i)
  fireEvent.change(screen.getByLabelText(/name/i), {target: {value: 'bob'}})
  screen.getByText(/hello.*bob/i)
  expect(window.localStorage.getItem('name')).toBe('bob')
})
