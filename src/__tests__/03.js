import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../final/03'
// import App from '../exercise/03'

test('App works', () => {
  render(<App />)
  userEvent.type(screen.getByRole('textbox', {name: /name/i}), 'mulan')
  userEvent.type(screen.getByRole('textbox', {name: /animal/i}), 'dragon')
  expect(screen.getByText('Hey mulan, your favorite animal is: dragon!')).toBeInTheDocument()
})
