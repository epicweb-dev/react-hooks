import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import App from '../final/01'
// import App from '../exercise/01'

test('typing a name shows a greeting', () => {
  render(<App />)
  fireEvent.change(screen.getByLabelText(/name/i), {target: {value: 'bob'}})
  screen.getByText(/hello.*bob/i)
})
