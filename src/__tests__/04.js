import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import Usage from '../final/04'
// import Usage from '../exercise/04'

test('can play a game of tic tac toe', () => {
  const {container} = render(<Usage />)
  // prettier-ignore
  const [
    s1, s2, s3,
    s4, s5, s6,
    s7, s8, s9 // eslint-disable-line no-unused-vars
  ] = Array.from(container.querySelectorAll('button'))
  expect(screen.getByText('Next player: X')).toBeInTheDocument()

  fireEvent.click(s1)
  expect(s1).toHaveTextContent('X')

  expect(screen.getByText('Next player: O')).toBeInTheDocument()
  fireEvent.click(s5)
  expect(s5).toHaveTextContent('O')

  expect(screen.getByText('Next player: X')).toBeInTheDocument()
  fireEvent.click(s9)
  expect(s9).toHaveTextContent('X')

  expect(screen.getByText('Next player: O')).toBeInTheDocument()
  fireEvent.click(s7)
  expect(s7).toHaveTextContent('O')

  expect(screen.getByText('Next player: X')).toBeInTheDocument()
  fireEvent.click(s3)
  expect(s3).toHaveTextContent('X')

  expect(screen.getByText('Next player: O')).toBeInTheDocument()
  fireEvent.click(s2)
  expect(s2).toHaveTextContent('O')

  expect(screen.getByText('Next player: X')).toBeInTheDocument()
  fireEvent.click(s6)
  expect(s6).toHaveTextContent('X')

  // game is over so no more moves may be played
  expect(screen.getByText('Winner: X')).toBeInTheDocument()
  fireEvent.click(s4)
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
