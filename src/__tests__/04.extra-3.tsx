import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {App} from '../final/04.extra-3'
// import {App} from '../exercise/04'

test('can play a game of tic tac toe', () => {
  const {rerender, container} = render(<App />)

  // prettier-ignore
  let [
    s1, s2, s3,
    s4, s5, s6,
    s7, s8, s9,
  ] = Array.from(screen.queryAllByRole('button'))
  if (!s1 || !s2 || !s3 || !s4 || !s5 || !s6 || !s7 || !s8 || !s9) {
    alfredTip(true, `Make sure to render all 9 buttons`, {
      displayEl: true,
    })
    return
  }
  expect(screen.getByText('Next player: X')).toBeInTheDocument()
  let gameStart = screen.getByText(/go to game start/i)
  expect(gameStart).toHaveAttribute('disabled')
  expect(gameStart).toHaveTextContent('current')

  userEvent.click(s1)
  expect(s1).toHaveTextContent('X')

  expect(screen.getByText('Next player: O')).toBeInTheDocument()
  const firstMove = screen.getByText(/go to move #1/i)
  expect(gameStart).not.toHaveAttribute('disabled')
  expect(gameStart).not.toHaveTextContent('current')
  expect(firstMove).toHaveAttribute('disabled')
  expect(firstMove).toHaveTextContent('current')

  userEvent.click(s5)
  expect(s5).toHaveTextContent('O')
  const secondMove = screen.getByText(/go to move #2/i)
  expect(gameStart).not.toHaveAttribute('disabled')
  expect(gameStart).not.toHaveTextContent('current')
  expect(firstMove).not.toHaveAttribute('disabled')
  expect(firstMove).not.toHaveTextContent('current')
  expect(secondMove).toHaveAttribute('disabled')
  expect(secondMove).toHaveTextContent('current')

  userEvent.click(firstMove)
  expect(gameStart).not.toHaveAttribute('disabled')
  expect(gameStart).not.toHaveTextContent('current')
  expect(firstMove).toHaveAttribute('disabled')
  expect(firstMove).toHaveTextContent('current')
  expect(secondMove).not.toHaveAttribute('disabled')
  expect(secondMove).not.toHaveTextContent('current')
  expect(s5).not.toHaveTextContent('O')

  alfredTip(() => {
    const before = container.textContent
    rerender(<App key="update1" />)
    expect(container.textContent).toBe(before)
  }, 'Make sure that refreshing the component restores the game to its last state')

  // because of the re-mount we need to get the new buttons
  ;[s1, s2, s3, s4, s5, s6, s7, s8, s9] = Array.from(
    screen.queryAllByRole('button'),
  )
  if (!s1 || !s2 || !s3 || !s4 || !s5 || !s6 || !s7 || !s8 || !s9) {
    alfredTip(true, `Make sure to render all 9 buttons`, {
      displayEl: true,
    })
    return
  }

  gameStart = screen.getByText(/go to game start/i)
  userEvent.click(gameStart)

  expect(s1).toHaveTextContent('')
  expect(s5).toHaveTextContent('')
  expect(screen.getAllByRole('listitem').length).toBe(3)

  userEvent.click(screen.getByText('restart'))
  expect(s1).toHaveTextContent('')
  expect(s5).toHaveTextContent('')
  expect(screen.getAllByRole('listitem').length).toBe(1)

  alfredTip(() => {
    const before = container.textContent
    rerender(<App key="update2" />)
    expect(container.textContent).toBe(before)
  }, 'Make sure that refreshing the component restores the game to its last state')
})
