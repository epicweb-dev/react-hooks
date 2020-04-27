import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import App from '../final/06.extra-1'
// import App from '../exercise/06'

beforeAll(() => {
  window.fetch.mockImplementation(() =>
    Promise.resolve({json: () => Promise.resolve({data: {pokemon: {}}})}),
  )
})

function buildPokemon(overrides) {
  return {
    name: 'jeffry',
    number: '777',
    image: '/some/image.png',
    attacks: {
      special: [
        {name: 'Super kick', type: 'Karate', damage: '122'},
        {name: 'Pound it', type: 'Cool', damage: '323'},
      ],
    },
    ...overrides,
  }
}

test('displays the pokemon', async () => {
  const fakePokemon = buildPokemon()
  window.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({data: {pokemon: fakePokemon}}),
    }),
  )
  render(<App />)
  const input = screen.getByLabelText(/pokemon/i)
  const submit = screen.getByText(/^submit$/i)

  // verify that an initial request is made when mounted
  fireEvent.change(input, {target: {value: fakePokemon.name}})
  fireEvent.click(submit)

  await screen.findByRole('heading', {name: new RegExp(fakePokemon.name, 'i')})

  expect(window.fetch).toHaveBeenCalledTimes(1)
  expect(window.fetch).toHaveBeenCalledWith('https://graphql-pokemon.now.sh', {
    method: 'POST',
    headers: {'content-type': 'application/json;charset=UTF-8'},
    // if this assertion fails, make sure that the pokemon name is being passed
    body: expect.stringMatching(new RegExp(fakePokemon.name, 'i')),
  })
  window.fetch.mockClear()

  // verify that a request is made when props change
  const fakePokemon2 = buildPokemon({name: 'fred'})
  window.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({data: {pokemon: fakePokemon2}}),
    }),
  )
  fireEvent.change(input, {target: {value: fakePokemon2.name}})
  fireEvent.click(submit)

  await screen.findByRole('heading', {name: new RegExp(fakePokemon.name, 'i')})

  expect(window.fetch).toHaveBeenCalledTimes(1)
  expect(window.fetch).toHaveBeenCalledWith('https://graphql-pokemon.now.sh', {
    method: 'POST',
    headers: {'content-type': 'application/json;charset=UTF-8'},
    // if this assertion fails, make sure that the pokemon name is being passed
    body: expect.stringMatching(new RegExp(fakePokemon2.name, 'i')),
  })
  window.fetch.mockClear()

  // verify that when props remain the same a request is not made
  fireEvent.click(submit)

  await screen.findByRole('heading', {name: new RegExp(fakePokemon2.name, 'i')})

  expect(
    window.fetch,
    'Make certain that you are providing a dependencies list in useEffect!',
  ).not.toHaveBeenCalled()

  // verify that an error renders an error
  const fakeErrorMessage = 'some fake error'
  window.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: false,
      json: () =>
        Promise.resolve({data: {errors: [{message: fakeErrorMessage}]}}),
    }),
  )

  fireEvent.change(input, {target: {value: 'george'}})
  fireEvent.click(submit)
  expect(await screen.findByRole('alert')).toHaveTextContent(fakeErrorMessage)
})
