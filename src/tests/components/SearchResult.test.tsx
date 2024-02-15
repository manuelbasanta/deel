/** @jest-environment jsdom */
import React from 'react'
import { describe, expect, test, jest } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchResults from '../../components/SearchResults/SearchResults'

describe('SearchResults component', () => {
  const mockData = ['Paris', 'Parisian', 'Parision']
  const mockSearchTerm = 'pa'
  const mockHandleSelect = jest.fn()

  test('renders loading message when loading is true', () => {
    render(<SearchResults loading error={false} notFound={false} data={[]} searchTerm="" handleSelect={() => {}} />)
    expect(screen.getByText('Loading...')).toBeDefined()
  })

  test('renders error message when error is true', () => {
    render(<SearchResults loading={false} error notFound={false} data={[]} searchTerm="" handleSelect={() => {}} />)
    expect(screen.getByText('There was an error')).toBeDefined()
  })

  test('renders no results message when notFound is true', () => {
    render(<SearchResults loading={false} error={false} notFound data={[]} searchTerm="" handleSelect={() => {}} />)
    expect(screen.getByText('No results')).toBeDefined()
  })

  test('renders search results', () => {
    const container = render(<SearchResults loading={false} error={false} notFound={false} data={mockData} searchTerm={mockSearchTerm} handleSelect={mockHandleSelect} />).container
    expect(screen.queryByText('Loading...')).toBeNull()
    expect(screen.queryByText('There was an error')).toBeNull()
    expect(screen.queryByText('No results')).toBeNull()

    const items = container.querySelectorAll('.result-item')

    expect(items.length).toBe(mockData.length)
    items.forEach((item, index) => {
      fireEvent.click(item)
      expect(mockHandleSelect).toHaveBeenCalledWith(mockData[index])
    })
  })
})
