import React from 'react'
import {render} from '@testing-library/react'
import Usage from '../final/05'
// import Usage from '../exercise/05'

test('calls VanillaTilt.init with the root node', () => {
  const {container, unmount} = render(<Usage />)
  const tiltRoot = container.querySelector('.tilt-root')
  expect(tiltRoot).toHaveProperty('vanillaTilt')

  const destroy = jest.spyOn(tiltRoot.vanillaTilt, 'destroy')
  expect(destroy).toHaveBeenCalledTimes(0)

  unmount()

  expect(destroy).toHaveBeenCalledTimes(1)
})
