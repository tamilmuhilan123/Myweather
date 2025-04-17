import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Weatherapp from './Weatherapp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Weatherapp/>
  </StrictMode>,
)
