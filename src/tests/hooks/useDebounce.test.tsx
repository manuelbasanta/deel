/** @jest-environment jsdom */
import { describe, expect, test, beforeEach, jest, afterEach } from '@jest/globals'
import { useDebounce } from '../../hooks/useDebounce'
import React, { useEffect } from 'react'
import { render, act } from '@testing-library/react'

const TestComponent: React.FC<{ callback: (...args: any[]) => Promise<void>, delay: number }> = ({ callback, delay }) => {
  const debouncedCallback = useDebounce(callback, delay)

  useEffect(() => {
    debouncedCallback()
  }, [debouncedCallback])

  return <div></div>
}

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  test('should debounce the callback', () => {
    const callback = jest.fn()
    const delay = 1000

    render(<TestComponent callback={callback} delay={delay} />)

    act(() => {
      jest.advanceTimersByTime(delay)
    })

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
