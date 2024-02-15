import React, { useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import capitalService from '../../services/capitals'
import SearchResults from '../SearchResults/SearchResults'
import './styles.css'

const MIN_SEARCH_CHARS = 2
const DEBOUNCE_DELAY = 1000

const SearchInput = (): React.ReactElement => {
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const handleSelect = (value: string): void => {
    setSearchTerm(value)
    setData([])
  }

  const stateCleanUp = (): void => {
    setError(false)
    setNotFound(false)
  }

  // The update is debounced so that request are not fired at every keystroke
  const onChange = useDebounce(async (value: string): Promise<void> => {
    stateCleanUp()
    const res = await capitalService.getByName(value)

    if (res.error) setError(true)
    else if (res.notFound) setNotFound(true)
    else setData(res.data)

    setLoading(false)
  }, DEBOUNCE_DELAY)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value }: { value: string } = event.target

    setSearchTerm(value)

    if (value.length >= MIN_SEARCH_CHARS) {
      setLoading(true)
      onChange(value)
    } else {
      stateCleanUp()
      setData([])
    }
  }

  return (
    <div className='search-input'>
      <input placeholder='Start typing' value={searchTerm} onChange={handleChange} id="cont"></input>
      {
        (searchTerm !== '') &&
          <SearchResults
            loading={loading}
            error={error}
            notFound={notFound}
            data={data}
            searchTerm={searchTerm}
            handleSelect={handleSelect}
          />
      }
    </div>
  )
}

export default SearchInput
