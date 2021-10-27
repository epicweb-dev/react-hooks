import * as React from 'react'
import {render} from '@testing-library/react'
import VanillaTilt from 'vanilla-tilt'
import {App} from '../final/05'
// import {App} from '../exercise/05'

interface HTMLVanillaTiltElement extends HTMLDivElement {
  vanillaTilt: VanillaTilt
}

test('calls VanillaTilt.init with the root node', () => {
  const {container, unmount} = render(<App />)
  const tiltRoot = container.querySelector(
    '.tilt-root',
  ) as HTMLVanillaTiltElement
  expect(tiltRoot).toHaveProperty('vanillaTilt')

  const destroy = jest.spyOn(tiltRoot.vanillaTilt, 'destroy')
  expect(destroy).toHaveBeenCalledTimes(0)

  unmount()

  expect(destroy).toHaveBeenCalledTimes(1)
})
