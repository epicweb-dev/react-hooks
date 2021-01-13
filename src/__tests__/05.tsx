import * as React from 'react'
import type {HTMLVanillaTiltElement} from 'vanilla-tilt'
import {render} from '@testing-library/react'
import App from '../final/05'
// import App from '../exercise/05'

function assertIsHTMLVanillaTiltElement(
  htmlElement: unknown,
): asserts htmlElement is HTMLVanillaTiltElement {
  if (
    htmlElement &&
    typeof htmlElement === 'object' &&
    'vanillaTilt' in htmlElement
  ) {
    return
  }
  throw new TypeError('htmlElement is not a valid HTMLVanillaTiltElement Node')
}
test('calls VanillaTilt.init with the root node', () => {
  const {container, unmount} = render(<App />)
  const tiltRoot = container.querySelector('.tilt-root')
  assertIsHTMLVanillaTiltElement(tiltRoot)

  expect(tiltRoot).toHaveProperty('vanillaTilt')

  const destroy = jest.spyOn(tiltRoot.vanillaTilt, 'destroy')
  expect(destroy).toHaveBeenCalledTimes(0)

  unmount()

  expect(destroy).toHaveBeenCalledTimes(1)
})
