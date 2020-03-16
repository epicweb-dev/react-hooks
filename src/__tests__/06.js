import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import Usage from '../final/06'
// import Usage from '../exercise/06'

beforeAll(() => {
  window.fetch.mockImplementation(() =>
    Promise.resolve({json: () => Promise.resolve({data: {pokemon: {}}})}),
  )
})

test('displays the pokemon', async () => {
  window.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({data: {pokemon: {id: 'fake-id'}}}),
    }),
  )
  render(<Usage />)
  const input = screen.getByLabelText(/pokemon/i)
  const submit = screen.getByText(/^submit$/i)

  // verify that an initial request is made when mounted
  fireEvent.change(input, {target: {value: 'jeffry'}})
  fireEvent.click(submit)
  await waitFor(() =>
    expect(screen.getByTestId('pokemon-display')).toHaveTextContent('fake-id'),
  )
  expect(window.fetch).toHaveBeenCalledTimes(1)
  expect(window.fetch).toHaveBeenCalledWith('https://graphql-pokemon.now.sh', {
    method: 'POST',
    headers: {'content-type': 'application/json;charset=UTF-8'},
    // if this assertion fails, make sure that the pokemon name is being passed
    body: expect.stringMatching(/jeffry/),
  })
  window.fetch.mockClear()

  // verify that a request is made when props change
  window.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({data: {pokemon: {id: 'id-that-is-fake'}}}),
    }),
  )
  fireEvent.change(input, {target: {value: 'fred'}})
  fireEvent.click(submit)
  await waitFor(() =>
    expect(screen.getByTestId('pokemon-display')).toHaveTextContent(
      'id-that-is-fake',
    ),
  )
  expect(window.fetch).toHaveBeenCalledTimes(1)
  expect(window.fetch).toHaveBeenCalledWith('https://graphql-pokemon.now.sh', {
    method: 'POST',
    headers: {'content-type': 'application/json;charset=UTF-8'},
    // if this assertion fails, make sure that the pokemon name is being passed
    body: expect.stringMatching(/fred/),
  })
  window.fetch.mockClear()

  // verify that when props remain the same a request is not made
  fireEvent.click(submit)
  expect(
    window.fetch,
    'Make certain that you are providing a dependencies list in useEffect!',
  ).not.toHaveBeenCalled()

  // verify that an error renders an error
  window.fetch.mockImplementationOnce(() =>
    Promise.reject({
      error: 'some fake error',
    }),
  )

  fireEvent.change(input, {target: {value: 'george'}})
  fireEvent.click(submit)
  await waitFor(() =>
    expect(screen.getByTestId('pokemon-display')).toHaveTextContent(/error/i),
  )
})
