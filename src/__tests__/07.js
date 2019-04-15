import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import Usage from '../exercises-final/07'
// import Usage from '../exercises/07'

test('logs only when the state is changed', () => {
  jest.spyOn(console, 'info').mockImplementation(() => {})
  const {getByLabelText, getByText} = render(<Usage />)
  expect(console.info.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "rendered",
    "",
  ],
  Array [
    "rendered",
    "",
  ],
]
`)
  console.info.mockClear()
  fireEvent.change(getByLabelText(/first name/i), {target: {value: 'a'}})
  const callCount = console.info.mock.calls.length
  if (callCount > 1) {
    throw new Error(
      `🚨  console.info was called ${callCount} times. It should have only been called once. Make sure to wrap the Upper component in React.memo so it's only re-rendered when it needs to be.`,
    )
  }
  expect(console.info.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "rendered",
    "a",
  ],
]
`)
  console.info.mockClear()

  fireEvent.click(getByText('0'))
  expect(console.info.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "rendered",
    "a",
  ],
]
`)

  console.info.mockRestore()
})
