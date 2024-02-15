/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const rootElement: HTMLElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

root.render(<App />)
