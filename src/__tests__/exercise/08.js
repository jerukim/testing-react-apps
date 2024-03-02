// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

function Counter() {
  const {count, increment, decrement} = useCounter()

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', async () => {
  render(<Counter />)

  const message = screen.getByText(/count:/i)
  const increment = screen.getByRole('button', {name: 'increment'})
  const decrement = screen.getByRole('button', {name: 'decrement'})

  expect(message).toHaveTextContent('Count: 0')

  await userEvent.click(increment)
  expect(message).toHaveTextContent('Count: 1')

  await userEvent.click(decrement)
  expect(message).toHaveTextContent('Count: 0')
})

test('allows customization of the initial count', () => {
  const initialCount = 5

  let result
  function TestComponent(props) {
    result = useCounter(props)
    return null
  }

  render(<TestComponent initialCount={initialCount} />)

  expect(result.count).toEqual(initialCount)
})

test('allows customization of the step', () => {
  const step = 5

  let result
  function TestComponent(props) {
    result = useCounter(props)
    return null
  }

  render(<TestComponent step={step} />)

  act(() => result.increment())
  expect(result.count).toEqual(step)

  act(() => result.decrement())
  expect(result.count).toEqual(0)
})

/* eslint no-unused-vars:0 */
