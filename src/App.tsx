import React from 'react'
import SearchInput from './components/SearchInput/SearchInput'
import './styles.css'

const App = (): React.ReactElement => {
  return (
    <div>
      <h1>Search for a capital of the world</h1>
      <SearchInput />
    </div>
  )
}

export default App
