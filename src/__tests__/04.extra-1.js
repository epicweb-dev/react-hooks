import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../final/04.extra-1'
// import App from '../exercise/04'

test('can play a game of tic tac toe', () => {
  const {container} = render(<App />)
  // prettier-ignore
  const [
    s1, s2, s3,
    s4, s5, s6,
    s7, s8, s9 // eslint-disable-line no-unused-vars
  ] = Array.from(container.querySelectorAll('button'))
  expect(screen.getByText('Next player: X')).toBeInTheDocument()

  userEvent.click(s1)
  expect(s1).toHaveTextContent('X')

  expect(screen.getByText('Next player: O')).toBeInTheDocument()
  userEvent.click(s5)
  expect(s5).toHaveTextContent('O')

  expect(screen.getByText('Next player: X')).toBeInTheDocument()
  userEvent.click(s9)
  expect(s9).toHaveTextContent('X')

  expect(screen.getByText('Next player: O')).toBeInTheDocument()
  userEvent.click(s7)
  expect(s7).toHaveTextContent('O')

  expect(screen.getByText('Next player: X')).toBeInTheDocument()
  userEvent.click(s3)
  expect(s3).toHaveTextContent('X')

  expect(screen.getByText('Next player: O')).toBeInTheDocument()
  userEvent.click(s2)
  expect(s2).toHaveTextContent('O')

  expect(screen.getByText('Next player: X')).toBeInTheDocument()
  userEvent.click(s6)
  expect(s6).toHaveTextContent('X')

  // game is over so no more moves may be played
  expect(screen.getByText('Winner: X')).toBeInTheDocument()
  userEvent.click(s4)
  expect(s4).toHaveTextContent('')

  // prettier-ignore
  expect(
    JSON.parse(window.localStorage.getItem('squares')),
    'Make sure that the "squares" localStorage item is updated with the JSON.stringified squares',
  ).toEqual([
    'X', 'O', 'X',
    null, 'O', 'X',
    'O', null, 'X'
  ])
})
