import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import App from '../final/03'
// import App from '../exercise/03'

test('App works', () => {
  render(<App />)
  fireEvent.change(screen.getByLabelText(/name/i), {target: {value: 'mulan'}})
  fireEvent.change(screen.getByLabelText(/animal/i), {
    target: {value: 'dragon'},
  })
  screen.getByText('Hey mulan, your favorite animal is: dragon!')
})
