import React from 'react'
import './styles.css'
import { normalizeName } from '../../utils/text'

interface SearchResultsProps {
  loading: boolean
  error: boolean
  notFound: boolean
  searchTerm: string
  data: string[]
  handleSelect: (value: string) => void
}

const SearchResults = ({ loading, error, notFound, data, searchTerm, handleSelect }: SearchResultsProps): React.ReactElement => {
  if (loading) return <div className='result-item'>Loading...</div>
  if (error) return <div className='result-item'>There was an error</div>

  const highlightMatch = (text: string): React.ReactElement => {
    const parts = normalizeName(text).split(new RegExp(`(${searchTerm})`, 'gi'))

    return (
      <>
        {
          parts.map(
            (part: string, i: number) =>
              <span key={i} style={part.toLowerCase() === searchTerm.toLowerCase() ? { fontWeight: 800 } : {} }>
                { part }
              </span>
          )
        }
      </>
    )
  }

  return (
    <div>
      {
        notFound
          ? <div className='result-item'>No results</div>
          : data.length > 0 &&
            <div className='results-content'>
              {data.map(item => <div className='result-item' key={item} onClick={() => { handleSelect(item) }}>{highlightMatch(item)}</div>)}
            </div>
      }
    </div>
  )
}

export default SearchResults
