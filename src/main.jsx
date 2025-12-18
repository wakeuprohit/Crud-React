import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import Simplecurd from './component/Simplecurd.jsx'
// import NewCurd from './component/NewCurd.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Simplecurd/> */}
    {/* <NewCurd/> */}
  </StrictMode>,
)
