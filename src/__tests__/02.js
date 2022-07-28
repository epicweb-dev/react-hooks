import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import App from '../final/02'
import App from '../exercise/02'

afterEach(() => {
  window.localStorage.removeItem('name')
})

test('App works', async () => {
  const {rerender} = render(<App />)
  const inputTextbox = screen.getByRole('textbox', {name: /name/i})

  await userEvent.clear(inputTextbox)
  await userEvent.type(inputTextbox, 'bob')
  const lsName = window.localStorage.getItem('name')

  // extra credit 4 serializes the value in localStorage so there's a bit of a
  // variation here.
  const isSerialized = lsName === '"bob"'
  if (isSerialized) {
    expect(screen.getByText(/hello.*bob/i)).toBeInTheDocument()
  } else if (lsName === 'bob') {
    expect(screen.getByText(/hello.*bob/i)).toBeInTheDocument()
  } else {
    throw new Error(
      `🚨 localStorage is not getting updated with the text that's typed. Be sure to call window.localStorage.setItem('name', name) in a useEffect callback that runs whenever the name changes.`,
    )
  }

  // make sure it's initialized properly
  window.localStorage.setItem('name', isSerialized ? '"jill"' : 'jill')
  rerender(<App key="new" />)
  const greetingText = screen.getByText(/hello/i).textContent
  if (!greetingText.includes('jill')) {
    throw new Error(
      `🚨 the app is not initialized with the name that's in localStorage. Make sure useState is called with the value in localStorage.`,
    )
  }
  if (greetingText.includes('"')) {
    throw new Error(
      `🚨 the value in localStorage is not getting deserialized properly. Make sure the value is deserialized when read from localStorage.`,
    )
  }
  expect(screen.getByRole('textbox', {name: /name/i})).toHaveValue('jill')
})
