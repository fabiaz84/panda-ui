import React from 'react'
import App from './App'
import { createRoot } from 'react-dom/client'
import './i18n/config'

const container = document.getElementById('root')

const root = createRoot(container)
root.render(<App />)
