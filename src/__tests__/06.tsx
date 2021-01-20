import * as React from 'react'
import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {App} from '../final/06'
// import {App} from '../exercise/06'

let fetchMock: jest.SpyInstance
beforeEach(() => {
  fetchMock = jest.spyOn(window, 'fetch')
})
afterEach(() => fetchMock.mockRestore())

test('displays the pokemon', async () => {
  render(<App />)
  const input = screen.getByLabelText(/pokemon/i)
  const submit = screen.getByText(/^submit$/i)

  // verify that an initial request is made when mounted
  userEvent.type(input, 'pikachu')
  userEvent.click(submit)

  await screen.findByRole('heading', {name: /pikachu/i})

  // verify that a request is made when props change
  userEvent.clear(input)
  userEvent.type(input, 'ditto')
  userEvent.click(submit)

  await screen.findByRole('heading', {name: /ditto/i})

  // verify that when props remain the same a request is not made
  fetchMock.mockClear()
  userEvent.click(submit)

  await screen.findByRole('heading', {name: /ditto/i})

  alfredTip(
    () => expect(fetchMock).not.toHaveBeenCalled(),
    'Make certain that you are providing a dependencies list in useEffect.',
  )
})
