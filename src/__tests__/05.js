import React from 'react'
import {render} from 'react-testing-library'
import Usage from '../exercises-final/05'
// import Usage from '../exercises/05'

test('calls VanillaTilt.init with the root node', () => {
  const {container, unmount} = render(<Usage />)
  const tiltRoot = container.querySelector('.tilt-root')
  expect(tiltRoot).toHaveProperty('vanillaTilt')

  const destroy = jest.spyOn(tiltRoot.vanillaTilt, 'destroy')
  expect(destroy).toHaveBeenCalledTimes(0)

  unmount()

  expect(destroy).toHaveBeenCalledTimes(1)
})
