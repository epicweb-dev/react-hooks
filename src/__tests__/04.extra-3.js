import * as React from 'react'
import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../final/04.extra-3'
// import App from '../exercise/04'

test('can play a game of tic tac toe', async () => {
  render(<App />)

  // prettier-ignore
  const [
    s1, s2, s3, // eslint-disable-line no-unused-vars
    s4, s5, s6, // eslint-disable-line no-unused-vars
    s7, s8, s9 // eslint-disable-line no-unused-vars
  ] = Array.from(screen.queryAllByRole('button'))
  expect(screen.getByText('Next player: X')).toBeInTheDocument()
  const gameStart = screen.getByText(/go to game start/i)
  expect(gameStart).toHaveAttribute('disabled')
  expect(gameStart).toHaveTextContent('current')

  await userEvent.click(s1)
  expect(s1).toHaveTextContent('X')

  expect(screen.getByText('Next player: O')).toBeInTheDocument()
  const firstMove = screen.getByText(/go to move #1/i)
  expect(gameStart).not.toHaveAttribute('disabled')
  expect(gameStart).not.toHaveTextContent('current')
  expect(firstMove).toHaveAttribute('disabled')
  expect(firstMove).toHaveTextContent('current')

  await userEvent.click(s5)
  expect(s5).toHaveTextContent('O')
  const secondMove = screen.getByText(/go to move #2/i)
  expect(gameStart).not.toHaveAttribute('disabled')
  expect(gameStart).not.toHaveTextContent('current')
  expect(firstMove).not.toHaveAttribute('disabled')
  expect(firstMove).not.toHaveTextContent('current')
  expect(secondMove).toHaveAttribute('disabled')
  expect(secondMove).toHaveTextContent('current')

  await userEvent.click(firstMove)
  expect(gameStart).not.toHaveAttribute('disabled')
  expect(gameStart).not.toHaveTextContent('current')
  expect(firstMove).toHaveAttribute('disabled')
  expect(firstMove).toHaveTextContent('current')
  expect(secondMove).not.toHaveAttribute('disabled')
  expect(secondMove).not.toHaveTextContent('current')
  expect(s5).not.toHaveTextContent('O')

  alfredTip(
    () =>
      expect(
        JSON.parse(window.localStorage.getItem('tic-tac-toe:history')),
      ).toEqual(
        // prettier-ignore
        [
          [null, null, null,
          null, null, null,
          null, null, null],
          ['X',  null, null,
          null, null, null,
          null, null, null],
          ['X',  null, null,
          null, 'O',  null,
          null, null, null]
        ],
      ),
    'Make sure that the localStorage item is updated with the JSON.stringified squares array',
  )

  await userEvent.click(gameStart)
  expect(s1).toHaveTextContent('')
  expect(s5).toHaveTextContent('')
  expect(screen.queryAllByRole('listitem').length).toBe(3)

  await userEvent.click(screen.getByText('restart'))
  expect(s1).toHaveTextContent('')
  expect(s5).toHaveTextContent('')
  expect(screen.queryAllByRole('listitem').length).toBe(1)

  alfredTip(
    () =>
      expect(
        JSON.parse(window.localStorage.getItem('tic-tac-toe:history')),
      ).toEqual(
        // prettier-ignore
        [
          [null, null, null,
          null, null, null,
          null, null, null]
        ],
      ),
    'Make sure that the localStorage item is updated with the JSON.stringified squares array',
  )
})
