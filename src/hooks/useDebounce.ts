/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useRef } from 'react'

/*
*
* Simple hook to debounce requests
*
*/
export const useDebounce = (callback: (...arg: any) => Promise<void>, delay: number): (...args: any[]) => void => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null >(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const debouncedCallback = (...args: any[]): void => {
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      void callback(...args)
    }, delay)
  }

  return debouncedCallback
}
